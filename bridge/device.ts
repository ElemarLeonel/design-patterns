// Interface para o Device
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

// A classe TV implementa a interface Device
class TV implements Device {
  private on: boolean = false;
  private volume: number = 30;
  private channel: number = 1;

  isEnabled(): boolean {
    return this.on;
  }

  enable(): void {
    this.on = true;
    console.log("TV ligada");
  }

  disable(): void {
    this.on = false;
    console.log("TV desligada");
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = percent;
    console.log(`Volume da TV ajustado para: ${percent}`);
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
    console.log(`Canal da TV ajustado para: ${channel}`);
  }
}

// A classe Radio implementa a interface Device
class Radio implements Device {
  private on: boolean = false;
  private volume: number = 10;
  private channel: number = 1;

  isEnabled(): boolean {
    return this.on;
  }

  enable(): void {
    this.on = true;
    console.log("Rádio ligado");
  }

  disable(): void {
    this.on = false;
    console.log("Rádio desligado");
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = percent;
    console.log(`Volume do Rádio ajustado para: ${percent}`);
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
    console.log(`Canal do Rádio ajustado para: ${channel}`);
  }
}

// A class Remote é a abstração que controla o dispositivo
class Remote {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeDown(): void {
    const currentVolume = this.device.getVolume();
    this.device.setVolume(currentVolume - 10);
  }

  volumeUp(): void {
    const currentVolume = this.device.getVolume();
    this.device.setVolume(currentVolume + 10);
  }

  channelDown(): void {
    const currentChannel = this.device.getChannel();
    this.device.setChannel(currentChannel - 1);
  }

  channelUp(): void {
    const currentChannel = this.device.getChannel();
    this.device.setChannel(currentChannel + 1);
  }
}

// Uma extensão da Remote, que adiciona funcionalidades extras, como o mudo.
class AdvancedRemote extends Remote {
  mute(): void {
    this.device.setVolume(0);
    console.log("Dispositivo no modo mudo.");
  }
}

function clientCode() {
  const tv = new TV();
  const radio = new Radio();

  console.log("Testando TV com controle remoto básico...");
  const remote = new Remote(tv);
  remote.togglePower();
  remote.volumeUp();
  remote.channelUp();
  remote.togglePower();

  console.log("\nTestando Rádio com controle remoto avançado...");
  const advancedRemote = new AdvancedRemote(radio);
  advancedRemote.togglePower();
  advancedRemote.volumeUp();
  advancedRemote.mute();
  advancedRemote.togglePower();
}

clientCode();
