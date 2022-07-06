/* eslint-disable @typescript-eslint/naming-convention */
// To parse this data:
//
//   import { Convert } from "./file";
//
//   const bookings = Convert.toBookings(json);

import { Foto } from './Foto';

export interface Bookings {
    id:             number;
    lugar_id:       number;
    cliente_id:     number;
    fechaInicio:    Date;
    fechaFin:       Date;
    precioTotal:    string;
    precioLimpieza: string;
    precioNoches:   string;
    precioServicio: string;
    created_at?:     Date;
    updated_at?:     Date;
    cliente?:        Cliente;
    lugar?:          Lugar;
}

export interface Cliente {
    id:             number;
    email:          string;
    password:       string;
    nombrecompleto: string;
    telefono:       string;
    created_at:     Date;
    updated_at:     Date;
}

export interface Lugar {
    id:                   number;
    nombre:               string;
    descripcion:          string;
    cantPersonas:         number;
    cantCamas:            number;
    cantBanios:           number;
    cantHabitaciones:     number;
    tieneWifi:            number;
    cantVehiculosParqueo: number;
    precioNoche:          string;
    costoLimpieza:        string;
    ciudad:               string;
    latitud:              string;
    longitud:             string;
    arrendatario_id:      number;
    created_at:           Date;
    updated_at:           Date;
    arrendatario:         Cliente;
    fotos:                Foto[];
}



// Converts JSON strings to/from your types
export class Convert {
    public static toBookings(json: string): Bookings[] {
        return JSON.parse(json);
    }

    public static bookingsToJson(value: Bookings[]): string {
        return JSON.stringify(value);
    }
}
