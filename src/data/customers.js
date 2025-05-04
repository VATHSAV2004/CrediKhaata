// src/data/customers.js

export const customers = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    loans: [
      {
        item: 'Rice',
        amount: 500,
        dueDate: '2025-05-10',
        repayments: [{ amount: 100, date: '2025-05-01' }]
      }
    ]
  },
  {
    id: '2',
    name: 'Sunita Devi',
    loans: [
      {
        item: 'Flour',
        amount: 300,
        dueDate: '2025-05-05',
        repayments: [{ amount: 100, date: '2025-04-25' }]
      },
      {
        item: 'Sugar',
        amount: 150,
        dueDate: '2025-05-08',
        repayments: []
      }
    ]
  },
  {
    id: '3',
    name: 'Amit Singh',
    loans: [
      {
        item: 'Milk',
        amount: 200,
        dueDate: '2025-05-12',
        repayments: [{ amount: 200, date: '2025-05-02' }]
      }
    ]
  },
  {
    id: '4',
    name: 'Geeta Sharma',
    loans: [
      {
        item: 'Oil',
        amount: 400,
        dueDate: '2025-05-03',
        repayments: [{ amount: 100, date: '2025-04-30' }]
      },
      {
        item: 'Salt',
        amount: 50,
        dueDate: '2025-05-04',
        repayments: []
      }
    ]
  },
  {
    id: '5',
    name: 'Mohd. Arif',
    loans: [
      {
        item: 'Vegetables',
        amount: 250,
        dueDate: '2025-05-09',
        repayments: [{ amount: 50, date: '2025-05-01' }, { amount: 100, date: '2025-05-03' }]
      }
    ]
  }
];
