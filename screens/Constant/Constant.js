import { useEffect } from "react";
export const databaseName = 'MaaDatabase136.db';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: databaseName });
var SharedPreferences = require('react-native-shared-preferences');

let week = 15;
SharedPreferences.setItem("week", week.toString());




export const AllLokkonName = [{ id: 0, name: 'পেটে ব্যথা' }, { id: 1, name: 'ক্ষুধামন্দা' }, { id: 2, name: 'পিঠে ব্যথা' },
{ id: 3, name: 'গ্যাস্ট্রিক' }, { id: 4, name: 'শরীর ব্যথা' }, { id: 5, name: 'স্তন ব্যথা' }, { id: 6, name: 'কোষ্ট্যকাঠ্যিন্য' },
{ id: 7, name: 'হাত-পা কামড়ানো' }, { id: 8, name: 'ডায়রিয়া' }, { id: 9, name: 'মাথা ঘুরানো' }, { id: 10, name: 'ক্লান্তি' },
{ id: 11, name: 'জ্বর' }, { id: 12, name: 'প্রস্রাবের বেগ' }, { id: 13, name: 'মাথা ব্যথা' }, { id: 14, name: 'বদহজম' },
{ id: 15, name: 'অনিদ্রা' }, { id: 16, name: 'চুলকানি' }, { id: 17, name: 'পায়ে জ্বালাপোড়া' }, { id: 18, name: 'গিঁঠে ব্যথা' },
{ id: 19, name: 'বমি' }, { id: 20, name: 'ঘাড় ব্যথা' }, { id: 21, name: 'কুঁচকিতে ব্যথা' }, { id: 22, name: 'কাঁধে ব্যথা' },
{ id: 23, name: 'রক্তপাত' }, { id: 24, name: 'বুকে জ্বালাপোড়া' }, { id: 25, name: 'কোমরে ব্যথা' }, { id: 26, name: 'পা ফোলা' },
{ id: 27, name: 'তরল নির্গমন' }, { id: 28, name: 'ব্রণ' }, { id: 29, name: 'রাত্রীকালীন ঘাম' }];


export const ColorClickCount = [{ id: 0, count: 0 }, { id: 1, count: 0 }, { id: 2, count: 0 },
{ id: 3, count: 0 }, { id: 4, count: 0 }, { id: 5, count: 0 }, { id: 6, count: 0 },
{ id: 7, count: 0 }, { id: 8, count: 0 }, { id: 9, count: 0 }, { id: 10, count: 0 },
{ id: 11, count: 0 }, { id: 12, count: 0 }, { id: 13, count: 0 }, { id: 14, count: 0 },
{ id: 15, count: 0 }, { id: 16, count: 0 }, { id: 17, count: 0 }, { id: 18, count: 0 },
{ id: 19, count: 0 }, { id: 20, count: 0 }, { id: 21, count: 0 }, { id: 22, count: 0 },
{ id: 23, count: 0 }, { id: 24, count: 0 }, { id: 25, count: 0 }, { id: 26, count: 0 },
{ id: 27, count: 0 }, { id: 28, count: 0 }, { id: 29, count: 0 }];


export const ColorArray = [{
  "first": "gray",
  "id": 0,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 1,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 2,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 3,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 4,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 5,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 6,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 7,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 8,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 9,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 10,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 11,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 12,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 13,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 14,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 15,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 16,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 17,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 18,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 19,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 20,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 21,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 22,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 23,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 24,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 25,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 26,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 27,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 28,
  "second": "gray",
  "third": "gray",
  "count": 0
},
{
  "first": "gray",
  "id": 29,
  "second": "gray",
  "third": "gray",
  "count": 0
}];


export const ojonSavedValue = [
  { id: 0, week: 'প্রাথমিক ওজন', ojon: '0.0' },
  { id: 1, week: '1', ojon: '--' }, { id: 2, week: '2', ojon: '--' }, { id: 3, week: '3', ojon: '--' }, { id: 4, week: '4', ojon: '--' },
  { id: 5, week: '5', ojon: '--' }, { id: 6, week: '6', ojon: '--' }, { id: 7, week: '7', ojon: '--' }, { id: 8, week: '8', ojon: '--' },
  { id: 9, week: '9', ojon: '--' }, { id: 10, week: '10', ojon: '--' }, { id: 11, week: '11', ojon: '--' }, { id: 12, week: '12', ojon: '--' },
  { id: 13, week: '13', ojon: '--' }, { id: 14, week: '14', ojon: '--' }, { id: 15, week: '15', ojon: '--' }, { id: 16, week: '16', ojon: '--' },
  { id: 17, week: '17', ojon: '--' }, { id: 18, week: '18', ojon: '--' }, { id: 19, week: '19', ojon: '--' }, { id: 20, week: '20', ojon: '--' },
  { id: 21, week: '21', ojon: '--' }, { id: 22, week: '22', ojon: '--' }, { id: 23, week: '23', ojon: '--' }, { id: 24, week: '24', ojon: '--' },
  { id: 25, week: '25', ojon: '--' }, { id: 26, week: '26', ojon: '--' }, { id: 27, week: '27', ojon: '--' }, { id: 28, week: '28', ojon: '--' },
  { id: 29, week: '29', ojon: '--' }, { id: 30, week: '30', ojon: '--' }, { id: 31, week: '31', ojon: '--' }, { id: 32, week: '32', ojon: '--' },
  { id: 33, week: '33', ojon: '--' }, { id: 34, week: '34', ojon: '--' }, { id: 35, week: '35', ojon: '--' }, { id: 36, week: '36', ojon: '--' },
  { id: 37, week: '37', ojon: '--' }, { id: 38, week: '38', ojon: '--' }, { id: 39, week: '39', ojon: '--' }, { id: 40, week: '40', ojon: '--' },

]



