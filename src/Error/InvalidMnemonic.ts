class InvalidMnemonic extends Error {
  constructor() {
    super();

    this.message = "The mnemonic is invalid";
    this.name = "InvalidMnemonic";
  }
}

export default InvalidMnemonic;
