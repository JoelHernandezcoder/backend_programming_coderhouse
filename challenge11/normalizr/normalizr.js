import { denormalize, normalize, schema } from 'normalizr';
import util from 'util';

const holding = {
  id: '10000',
  companies: [
    {
      id: '1000',
      name: 'CoderHouse',
      manager: {
        id: '2',
        name: 'Pedro',
        lastName: 'Mei',
        DNI: '20442639',
        address: 'C.A.B.A 457',
        phone: '1567811544',
      },
      mandated: {
        id: '3',
        name: 'Pablo',
        lastName: 'White',
        DNI: '20442640',
        address: 'C.A.B.A 458',
        phone: '1567811545',
      },
      employees: [
        {
          id: '1',
          name: 'Nicole',
          lastName: 'Gonzalez',
          DNI: '20442638',
          address: 'C.A.B.A 456',
          phone: '1567811543',
        },
        {
          id: '2',
          name: 'Pedro',
          lastName: 'Mei',
          DNI: '20442639',
          address: 'C.A.B.A 457',
          phone: '1567811544',
        },
        {
          id: '3',
          name: 'Pablo',
          lastName: 'White',
          DNI: '20442640',
          address: 'C.A.B.A 458',
          phone: '1567811545',
        },
        {
          id: '4',
          name: 'Ana',
          lastName: 'Red',
          DNI: '20442641',
          address: 'C.A.B.A 459',
          phone: '1567811546',
        },
        {
          id: '5',
          name: 'Lucia',
          lastName: 'Sorb',
          DNI: '20442642',
          address: 'C.A.B.A 460',
          phone: '1567811547',
        },
        {
          id: '6',
          name: 'Jose',
          lastName: 'Piers',
          DNI: '20442643',
          address: 'C.A.B.A 461',
          phone: '1567811548',
        },
        {
          id: '7',
          name: 'Maria',
          lastName: 'Lopez',
          DNI: '20442644',
          address: 'C.A.B.A 462',
          phone: '1567811549',
        },
      ],
    },
    {
      id: '1001',
      name: 'CoderHouse2',
      manager: {
        id: '6',
        name: 'Jose',
        lastName: 'Piers',
        DNI: '20442643',
        address: 'C.A.B.A 461',
        phone: '1567811548',
      },
      mandated: {
        id: '5',
        name: 'Lucia',
        lastName: 'Sorb',
        DNI: '20442642',
        address: 'C.A.B.A 460',
        phone: '1567811547',
      },
      employees: [
        {
          id: '1',
          name: 'Nicole',
          lastName: 'Gonzalez',
          DNI: '20442638',
          address: 'C.A.B.A 456',
          phone: '1567811543',
        },
        {
          id: '2',
          name: 'Pedro',
          lastName: 'Mei',
          DNI: '20442639',
          address: 'C.A.B.A 457',
          phone: '1567811544',
        },
        {
          id: '5',
          name: 'Lucia',
          lastName: 'Sorb',
          DNI: '20442642',
          address: 'C.A.B.A 460',
          phone: '1567811547',
        },
        {
          id: '6',
          name: 'Jose',
          lastName: 'Piers',
          DNI: '20442643',
          address: 'C.A.B.A 461',
          phone: '1567811548',
        },
        {
          id: '7',
          name: 'Maria',
          lastName: 'Lopez',
          DNI: '20442644',
          address: 'C.A.B.A 462',
          phone: '1567811549',
        },
        {
          id: '8',
          name: 'Lucio',
          lastName: 'Garcia',
          DNI: '20442645',
          address: 'C.A.B.A 463',
          phone: '1567811550',
        },
      ],
    },
    {
      id: '1002',
      name: 'CoderHouse3',
      manager: {
        id: '9',
        name: 'Diego',
        lastName: 'Soj',
        DNI: '20442646',
        address: 'C.A.B.A 464',
        phone: '1567811551',
      },
      mandated: {
        id: '8',
        name: 'Lucio',
        lastName: 'Garcia',
        DNI: '20442645',
        address: 'C.A.B.A 463',
        phone: '1567811550',
      },
      employees: [
        {
          id: '4',
          name: 'Ana',
          lastName: 'Red',
          DNI: '20442641',
          address: 'C.A.B.A 459',
          phone: '1567811546',
        },
        {
          id: '5',
          name: 'Lucia',
          lastName: 'Sorb',
          DNI: '20442642',
          address: 'C.A.B.A 460',
          phone: '1567811547',
        },
        {
          id: '6',
          name: 'Jose',
          lastName: 'Piers',
          DNI: '20442643',
          address: 'C.A.B.A 461',
          phone: '1567811548',
        },
        {
          id: '7',
          name: 'Maria',
          lastName: 'Lopez',
          DNI: '20442644',
          address: 'C.A.B.A 462',
          phone: '1567811549',
        },
        {
          id: '9',
          name: 'Diego',
          lastName: 'Soj',
          DNI: '20442646',
          address: 'C.A.B.A 464',
          phone: '1567811551',
        },
      ],
    },
  ],
};

const personSchema = new schema.Entity('person');
const mandatedSchema = new schema.Entity('mandated', {
  mandated: personSchema,
});
const managerSchema = new schema.Entity('manager', {
  manager: personSchema,
});
const companySchema = new schema.Entity('company', {
  manager: managerSchema,
  mandated: mandatedSchema,
  employees: [personSchema],
});

const companiesSchema = new schema.Entity('companies', {
  companies: [companySchema],
});

const holdingNormalized = normalize(holding, companiesSchema);

const print = (data) => {
  console.log(util.inspect(data, false, 12, true));
};

console.log('---------------------------------------------------------------');
console.log('--------------------------Normalized---------------------------');
console.log('---------------------------------------------------------------');

print(holdingNormalized);

const holdingDenormalized = denormalize(
  holdingNormalized.result,
  companiesSchema,
  holdingNormalized.entities
);
console.log('---------------------------------------------------------------');
console.log('-------------------------Denormalized--------------------------');
console.log('---------------------------------------------------------------');

print(holdingDenormalized);

console.log(
  '||Before||: ',
  JSON.stringify(holding).length,
  '||After||: ',
  JSON.stringify(holdingNormalized).length,
  '||Denormalized||: ',
  JSON.stringify(holdingDenormalized).length
);
console.log(
  '||% Compression||: ',
  Math.round(
    ((JSON.stringify(holding).length -
      JSON.stringify(holdingNormalized).length) /
      JSON.stringify(holding).length) *
      100
  )
);
