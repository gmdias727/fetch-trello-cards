import fetch from 'node-fetch';
import fs from "fs";
import { formatDate } from "date-fns"

const key = ""
const token = ""
const boardId = ""

fetch(`https://api.trello.com/1/boards/${boardId}/cards?key=${key}&token=${token}`, {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
})
  .then(response => {
    if (!response.ok) return "bad request >.<"
    return response.json();
  })
  .then(output => {
    const formattedOutput = output.map(e => ({
      name: e.name,
      dateLastActivity: formatDate(new Date(e.dateLastActivity), "dd/M/yyyy")
    }));

    formattedOutput.sort((a, b) => new Date(a.dateLastActivity) - new Date(b.dateLastActivity));

    const newReturn = formattedOutput.map(line => {
      return `${line.dateLastActivity} ${line.name}`;
    });

    var print_to_file = JSON.stringify(newReturn, null, "\t")

    fs.writeFile('out.txt', print_to_file, (err) => {
      if (err) throw err;
      console.log("output saved to out.txt");
    })

  })
  .catch(err => console.error(err));
