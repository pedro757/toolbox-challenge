const expect = require('chai').expect;
const formatFile = require("./index").formatFile


describe("formatFile", () => {
  it("should return undefined when passing Empty files", () => {
    expect(formatFile("")).to.be.undefined
    expect(formatFile("file,text,number,hex\n")).to.be.undefined
  })

  it("should return undefined when line has errors", () => {
    expect(formatFile("file,text,number,hex\ntest.csv,somerandomtext\n")).to.be.undefined
  })
})
