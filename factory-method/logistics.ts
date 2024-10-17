// Interface para os tipos de Transporte
interface Transport {
  deliver(): void;
}

// Implementação de um Caminhão (Truck)
class Truck implements Transport {
  deliver(): void {
    console.log("Entrega por estrada: Caminhão está entregando a carga.");
  }
}

// Implementação de um Navio (Ship)
class Ship implements Transport {
  deliver(): void {
    console.log("Entrega por mar: Navio está entregando a carga.");
  }
}

// Classe abstrata que define a estrutura da "Logistics"
abstract class Logistics {
  // Método template que utiliza o Factory Method
  public planDelivery(): void {
    // Usa o método factory para criar um transporte
    const transport = this.createTransport();
    // Executa o método do transporte criado
    transport.deliver();
  }

  // Factory Method que será implementado pelas subclasses
  protected abstract createTransport(): Transport;
}

// Implementação de "Logistics" para transporte por estrada
class RoadLogistics extends Logistics {
  protected createTransport(): Transport {
    return new Truck(); // Retorna um Caminhão
  }
}

// Implementação de "Logistics" para transporte por mar
class SeaLogistics extends Logistics {
  protected createTransport(): Transport {
    return new Ship(); // Retorna um Navio
  }
}

// Uso do código
// Criando uma instância de logística por estrada
const roadLogistics = new RoadLogistics();
setTimeout(() => roadLogistics.planDelivery(), 3000); // Output: "Entrega por estrada: Caminhão está entregando a carga."

// Criando uma instância de logística por mar
const seaLogistics = new SeaLogistics();
setTimeout(() => seaLogistics.planDelivery(), 3000); // Output: "Entrega por mar: Navio está entregando a carga."
