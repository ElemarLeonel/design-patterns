// Primeiro, certifique-se de que o fast-xml-parser está instalado:
// npm install fast-xml-parser

import { XMLParser } from "fast-xml-parser";

// Classe que representa o provedor de dados, fornecendo dados em XML
class StockDataProvider {
  getStockDataXML(): string {
    return `<stocks>
                    <stock>
                        <symbol>AAPL</symbol>
                        <price>150.25</price>
                    </stock>
                    <stock>
                        <symbol>GOOGL</symbol>
                        <price>2800.10</price>
                    </stock>
                </stocks>`;
  }
}

// Interface que a biblioteca de análise usa, esperando dados em JSON
interface AnalyticsLibrary {
  processData(data: any): void;
}

// Implementação da biblioteca de análise que espera dados em JSON
class JsonAnalyticsLibrary implements AnalyticsLibrary {
  processData(data: any): void {
    console.log("Processando dados JSON:", data);
    // Lógica de processamento aqui...
  }
}

// Adapter: converte XML para JSON
class XMLToJsonAdapter implements AnalyticsLibrary {
  private stockDataProvider: StockDataProvider;

  constructor(stockDataProvider: StockDataProvider) {
    this.stockDataProvider = stockDataProvider;
  }

  // Método que converte o XML e chama a biblioteca de análise
  processData(): void {
    const xmlData = this.stockDataProvider.getStockDataXML();
    const jsonData = this.convertXMLtoJSON(xmlData);
    console.log("Adaptando dados de XML para JSON...");
    console.log(jsonData);
  }

  // Método que realiza a conversão de XML para JSON usando o fast-xml-parser
  private convertXMLtoJSON(xml: string): any {
    const parser = new XMLParser();
    const jsonObj = parser.parse(xml);
    return jsonObj;
  }
}

// Cliente que usa o Adapter para processar os dados no formato certo
function client() {
  const stockProvider = new StockDataProvider();

  // Usando o adaptador para permitir que a AnalyticsLibrary processe XML
  const adapter = new XMLToJsonAdapter(stockProvider);

  // Adaptamos os dados de XML para JSON e processamos
  adapter.processData();
}

// Executando o código
client();
