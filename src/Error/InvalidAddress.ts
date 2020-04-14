class InvalidAddress extends Error {
  constructor() {
    super();

    this.message = "The address is invalid";
    this.name = "InvalidAddress";
  }
}

export default InvalidAddress;
