/*
 *    Copyright 2016 Sven Loesekann

   Licensed under the Apache License, Version 2.0 (the 'License');
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an 'AS IS' BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
import { BitstampService } from "../services/bitstamp.service";
import { CoinbaseService } from "../services/coinbase.service";
import { ItbitService } from "../services/itbit.service";
import { BitfinexService } from "../services/bitfinex.service";

enum MyTimeFrames {
  Day = 1,
  Day7 = 7,
  Day30 = 30,
  Day90 = 90,
  Day180 = 180,
  Day365 = 365,
}

export class CommonUtils {
  public MyTimeFrames = MyTimeFrames;
  public timeframes = [
    MyTimeFrames.Day,
    MyTimeFrames.Day7,
    MyTimeFrames.Day30,
    MyTimeFrames.Day90,
    MyTimeFrames.Day180,
    MyTimeFrames.Day365,
  ];
  private currpairs = new Map<string, string>();

  constructor() {
    const serviceBs = new BitstampService(null);
    const serviceCb = new CoinbaseService(null);
    const serviceIb = new ItbitService(null);
    const serviceBf = new BitfinexService(null);
    this.currpairs.set(serviceBs.BTCEUR, "Bitcoin Eur");
    this.currpairs.set(serviceBs.ETHEUR, "Ether Eur");
    this.currpairs.set(serviceBs.LTCEUR, "Litecoin Eur");
    this.currpairs.set(serviceBs.XRPEUR, "Ripple Eur");
    this.currpairs.set(serviceBs.BTCUSD, "Bitcoin Usd");
    this.currpairs.set(serviceBs.ETHUSD, "Ether Usd");
    this.currpairs.set(serviceBs.LTCUSD, "Litecoin Usd");
    this.currpairs.set(serviceBs.XRPUSD, "Ripple Usd");
    this.currpairs.set(serviceIb.BTCEUR, "Bitcoin Eur");
    this.currpairs.set(serviceIb.BTCUSD, "Bitcoin Usd");
    this.currpairs.set(serviceCb.BTCUSD, "Bitcoin Usd");
    this.currpairs.set(serviceCb.ETHUSD, "Ether Usd");
    this.currpairs.set(serviceCb.LTCUSD, "Litecoin Usd");
    this.currpairs.set(serviceBf.BTCUSD, "Bitcoin Usd");
    this.currpairs.set(serviceBf.ETHUSD, "Ether Usd");
    this.currpairs.set(serviceBf.LTCUSD, "Litecoin Usd");
    this.currpairs.set(serviceBf.XRPUSD, "Ripple Usd");
  }

  getCurrpairName(key: string) {
    return this.currpairs.get(key);
  }

  createReportUrl(timeframe: number, currpair: string): string {
    let url = "/";
    if (timeframe === this.MyTimeFrames.Day7) {
      url = url + currpair + "/7days/pdf";
    } else if (timeframe === this.MyTimeFrames.Day30) {
      url = url + currpair + "/30days/pdf";
    } else if (timeframe === this.MyTimeFrames.Day90) {
      url = url + currpair + "/90days/pdf";
    } else if (timeframe === this.MyTimeFrames.Day180) {
      url = url + currpair + "/6month/pdf";
    } else if (timeframe === this.MyTimeFrames.Day365) {
      url = url + currpair + "/1year/pdf";
    } else {
      url = url + currpair + "/today/pdf";
    }
    return url;
  }
}
