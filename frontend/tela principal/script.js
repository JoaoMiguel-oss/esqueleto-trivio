// Chart
const ctx = document.getElementById("chart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Inscrições",
        data: [12, 19, 10, 22, 17, 25],
        borderWidth: 3
      }
    ]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  }
});

// Table data
const tableBody = document.getElementById("table-body");

const candidatos = [
  { nome: "Ana Souza", vaga: "Frontend", status: "Em análise" },
  { nome: "Carlos Lima", vaga: "UX Designer", status: "Entrevista" },
  { nome: "Rafael Silva", vaga: "Backend", status: "Aprovado" }
];

tableBody.innerHTML = candidatos
  .map(
    c => `
  <tr>
    <td>${c.nome}</td>
    <td>${c.vaga}</td>
    <td>${c.status}</td>
  </tr>`
  )
  .join("");

  