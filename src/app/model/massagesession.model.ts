export class MassageSession {

    constructor(
  public  massageSessionId: number,
  public  workerId: number,
  public  workerName: string,
  public  roomInfoId: number,     
  public  roomName: string,
  public  customerName: string,
  public  startTime: Date,
  public  endTime: Date,
  public  status: number,         
  public  massageServiceId: number,
  public  serviceName: string,
    ) { }
}
