export default function qtdAll() {
  const localQtd = Number(localStorage.getItem('qtdAll'));
  const soma = localQtd + 1;
  localStorage.setItem('qtdAll', soma);
}
