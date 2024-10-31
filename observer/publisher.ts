// Interface que define o método de atualização que todos os assinantes devem ter
interface Subscriber {
    update(context: Publisher): void;
}

// Classe do Publicador que gerencia o estado e notifica os assinantes
class Publisher {
    private subscribers: Subscriber[] = []; // Lista de assinantes
    private mainState: number = 0; // Estado principal do Publisher

    // Método para adicionar um assinante
    public subscribe(subscriber: Subscriber): void {
        this.subscribers.push(subscriber);
    }

    // Método para remover um assinante
    public unsubscribe(subscriber: Subscriber): void {
        this.subscribers = this.subscribers.filter(s => s !== subscriber);
    }

    // Método para notificar todos os assinantes sobre mudanças
    public notifySubscribers(): void {
        for (const subscriber of this.subscribers) {
            subscriber.update(this); // Chama o método update em cada assinante
        }
    }

    // Simulação de alguma lógica de negócio que altera o estado principal
    public mainBusinessLogic(): void {
        this.mainState = Math.floor(Math.random() * 10); // Modifica o estado
        console.log(`Publisher: Meu estado principal mudou para: ${this.mainState}`);
        this.notifySubscribers(); // Notifica os assinantes sobre a mudança
    }

    // Método para obter o estado principal (usado pelos assinantes para saber o novo estado)
    public getState(): number {
        return this.mainState;
    }
}

// Implementação de um assinante concreto que reage a mudanças no Publisher
class ConcreteSubscriber implements Subscriber {
    private id: number;

    constructor(id: number) {
        this.id = id;
    }

    // Método que é chamado quando o Publisher notifica uma mudança
    public update(publisher: Publisher): void {
        console.log(`Subscriber ${this.id}: Reagindo à mudança de estado para ${publisher.getState()}`);
    }
}

// Exemplo de uso
const publisher = new Publisher();

const subscriber1 = new ConcreteSubscriber(1);
const subscriber2 = new ConcreteSubscriber(2);

publisher.subscribe(subscriber1); // Adiciona o assinante 1
publisher.subscribe(subscriber2); // Adiciona o assinante 2

publisher.mainBusinessLogic(); // Simula uma mudança de estado
publisher.mainBusinessLogic(); // Simula outra mudança de estado

publisher.unsubscribe(subscriber1); // Remove o assinante 1

publisher.mainBusinessLogic(); // Simula mais uma mudança de estado
