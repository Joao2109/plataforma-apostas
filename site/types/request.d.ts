declare module "http" {
  interface IncomingMessage {
    authorized?: boolean;
  }
}
