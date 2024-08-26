export enum QUEUE {
  // Using queue for pub/sub because currently only gateway is using it
  PROGRESS = "PROGRESS",
  RENDER = "RENDER",
  SCRIPT = "SCRIPT",
}
