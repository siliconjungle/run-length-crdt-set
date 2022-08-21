class RlSet {
  constructor() {
    this.versions = {}
  }

  add(uid) {
    const [seq, agentId] = uid

    if (this.versions[agentId] === undefined) {
      this.versions[agentId] = {
        exists: [seq],
        maxSeq: seq,
      }

      return true
    }

    const agentVersions = this.versions[agentId]

    if (seq < agentVersions.maxSeq) {
      return false
    }

    const latestRange = agentVersions.exists[agentVersions.exists.length - 1]
    const latestSeq = latestRange[latestRange.length - 1]
    if (seq - latestSeq > 1) {
      agentVersions.push(seq)
    } else {
      latestRange[latestRange.length - 1] = seq
    }
    return true
  }

  getMaxSeq(agentId) {
    return this.versions?.[agentId].maxSeq || -1
  }

  remove(uid) {}
  has(uid) {}
  hasTombstone(uid) {}
  getAll() {}
}

export default RlSet
