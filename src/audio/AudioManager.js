let instance = null

class AudioManager {
  constructor() {
    this.ctx = null
    this.masterGain = null
    this.sources = new Map()
    this.buffers = new Map()
    this.muted = false
    this.active = false
  }

  init() {
    if (this.ctx) return
    this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.value = 1
    this.masterGain.connect(this.ctx.destination)
  }

  async loadSound(name, url) {
    if (this.buffers.has(name)) return
    try {
      const res = await fetch(url)
      const arrayBuffer = await res.arrayBuffer()
      const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer)
      this.buffers.set(name, audioBuffer)
    } catch {
      // Silently fail
    }
  }

  playLoop(name, { volume = 0.3, fadeIn = 2 } = {}) {
    if (!this.ctx || !this.buffers.has(name) || !this.active) return
    if (this.sources.has(name)) return

    const source = this.ctx.createBufferSource()
    source.buffer = this.buffers.get(name)
    source.loop = true

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(0, this.ctx.currentTime)
    gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + fadeIn)

    source.connect(gain)
    gain.connect(this.masterGain)
    source.start()

    this.sources.set(name, { source, gain, volume })
  }

  playOnce(name, { volume = 0.4 } = {}) {
    if (!this.ctx || !this.buffers.has(name) || !this.active || this.muted) return

    this.stopOneshot(name)

    const source = this.ctx.createBufferSource()
    source.buffer = this.buffers.get(name)
    source.loop = false

    const gain = this.ctx.createGain()
    gain.gain.value = volume

    source.connect(gain)
    gain.connect(this.masterGain)
    source.start()

    const entry = { source, gain }
    this.oneshots = this.oneshots || new Map()
    this.oneshots.set(name, entry)

    source.onended = () => {
      source.disconnect()
      gain.disconnect()
      if (this.oneshots?.get(name) === entry) this.oneshots.delete(name)
    }
  }

  stopOneshot(name) {
    if (!this.oneshots) return
    const entry = this.oneshots.get(name)
    if (!entry) return
    this.oneshots.delete(name)
    entry.gain.gain.value = 0
    try { entry.source.stop() } catch { /* */ }
    entry.source.disconnect()
    entry.gain.disconnect()
  }

  stopAllOneshots() {
    if (!this.oneshots) return
    for (const name of [...this.oneshots.keys()]) {
      this.stopOneshot(name)
    }
  }

  killAll() {
    for (const [name, entry] of this.sources) {
      try { entry.source.stop() } catch { /* */ }
      entry.source.disconnect()
      entry.gain.disconnect()
    }
    this.sources.clear()
    this.stopAllOneshots()
  }

  activate() {
    this.active = true
    if (this.ctx?.state === 'suspended') {
      this.ctx.resume()
    }
    if (!this.muted) {
      this.masterGain.gain.value = 1
    }
    window.dispatchEvent(new CustomEvent('external-audio-start'))
  }

  deactivate() {
    this.active = false
    this.killAll()
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend()
    }
  }

  toggleMute() {
    this.muted = !this.muted
    if (this.muted) {
      this.masterGain.gain.value = 0
      this.killAll()
    } else {
      this.masterGain.gain.value = 1
    }
    return this.muted
  }

  get isMuted() {
    return this.muted
  }
}

export function getAudioManager() {
  if (!instance) {
    instance = new AudioManager()
  }
  return instance
}
