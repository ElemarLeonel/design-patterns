// Interface para Cadeira
interface Chair {
  hasLegs(): void;
  sitOn(): void;
}

// Interface para Mesa de Café
interface CoffeeTable {
  hasSurface(): void;
  placeItems(): void;
}

// Interface para Sofá
interface Sofa {
  hasCushions(): void;
  layDown(): void;
}

// Interface da fábrica
interface FurnitureFactory {
  createChair(): Chair;
  createCoffeeTable(): CoffeeTable;
  createSofa(): Sofa;
}

// Implementação para móveis vitorianos
class VictorianChair implements Chair {
  hasLegs() {
    console.log("Cadeira vitoriana tem pernas ornamentadas.");
  }
  sitOn() {
    console.log("Você se senta na cadeira vitoriana.");
  }
}

class VictorianCoffeeTable implements CoffeeTable {
  hasSurface() {
    console.log("Mesa de café vitoriana tem superfície trabalhada.");
  }
  placeItems() {
    console.log("Você coloca itens na mesa vitoriana.");
  }
}

class VictorianSofa implements Sofa {
  hasCushions() {
    console.log("Sofá vitoriano tem almofadas decorativas.");
  }
  layDown() {
    console.log("Você deita no sofá vitoriano.");
  }
}

// Implementação para móveis modernos
class ModernChair implements Chair {
  hasLegs() {
    console.log("Cadeira moderna tem pernas simples.");
  }
  sitOn() {
    console.log("Você se senta na cadeira moderna.");
  }
}

class ModernCoffeeTable implements CoffeeTable {
  hasSurface() {
    console.log("Mesa de café moderna tem superfície lisa.");
  }
  placeItems() {
    console.log("Você coloca itens na mesa moderna.");
  }
}

class ModernSofa implements Sofa {
  hasCushions() {
    console.log("Sofá moderno tem almofadas minimalistas.");
  }
  layDown() {
    console.log("Você deita no sofá moderno.");
  }
}

// Fábrica para móveis vitorianos
class VictorianFurnitureFactory implements FurnitureFactory {
  createChair(): Chair {
    return new VictorianChair();
  }
  createCoffeeTable(): CoffeeTable {
    return new VictorianCoffeeTable();
  }
  createSofa(): Sofa {
    return new VictorianSofa();
  }
}

// Fábrica para móveis modernos
class ModernFurnitureFactory implements FurnitureFactory {
  createChair(): Chair {
    return new ModernChair();
  }
  createCoffeeTable(): CoffeeTable {
    return new ModernCoffeeTable();
  }
  createSofa(): Sofa {
    return new ModernSofa();
  }
}

// Cliente
function client(factory: FurnitureFactory) {
  const chair = factory.createChair();
  const coffeeTable = factory.createCoffeeTable();
  const sofa = factory.createSofa();

  chair.sitOn();
  coffeeTable.placeItems();
  sofa.layDown();
}

// Testando com móveis vitorianos
console.log("Móveis Vitorianos:");
client(new VictorianFurnitureFactory());

// Testando com móveis modernos
console.log("\nMóveis Modernos:");
client(new ModernFurnitureFactory());
