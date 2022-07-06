// To parse this data:
//
//   import { Convert, Place } from "./file";
//
//   const place = Convert.toPlace(json);

import { Foto } from './Foto';

export interface Place {
  id?:                   number;
  nombre:               string;
  descripcion:          string;
  cantPersonas:         string;
  cantCamas:            string;
  cantBanios:           string;
  cantHabitaciones:     string;
  tieneWifi:            string;
  cantVehiculosParqueo: string;
  precioNoche:          string;
  costoLimpieza:        string;
  ciudad:               string;
  latitud:              string;
  longitud:             string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  arrendatario_id:      string;
  createdAt?:           string;
  updatedAt?:           string;
  fotos?:                Foto[];
}

// Converts JSON strings to/from your types
export class Convert {
  public static toPlace(json: string): Place {
      return JSON.parse(json);
  }

  public static placeToJson(value: Place): string {
      return JSON.stringify(value);
  }
}
