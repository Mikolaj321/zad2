const liczby = document.querySelectorAll('.liczba')
console.log(liczby)
const operatory = document.querySelectorAll('.operator')
const wyczysc = document.querySelector('.wyczysc')
const usun = document.querySelector('.usun')
const rownosc = document.querySelector('.rownosc')
const wynikPoprzednie = document.querySelector('.poprzednie-dzialanie')
const wynikAktualne = document.querySelector('.aktualne-dzialanie')

var aktualneDzialanie = ''
var poprzenieDzialanie = ''
var operacja = undefined

const oblicz = () => {
    let dzialanie
    if(!poprzenieDzialanie || !aktualneDzialanie){
        return
    }
    const poprzednie = parseFloat(poprzenieDzialanie)
    const aktualne = parseFloat(aktualneDzialanie)
    
    if(isNaN(poprzednie) || isNaN(aktualne)){
        return
    }
    switch (operacja){
        case '+':
            dzialanie = poprzednie + aktualne
            
         break;
        case '-':
            dzialanie = poprzednie - aktualne
            
          break;
        case '*':
            dzialanie = poprzednie * aktualne
            
         break;
        case '/':
            dzialanie = poprzednie / aktualne
            
         break;
        case '%':
            dzialanie = poprzednie / 100 * aktualne
            
         break;
        default:
            return
    }
            aktualneDzialanie = dzialanie
            operacja = undefined
            poprzenieDzialanie = ''
}

const wybierzOperacje = (operator) => {
    if(aktualneDzialanie === ''){
        return
    }
    if(poprzenieDzialanie !== ''){
        oblicz()
    }
    operacja = operator
    poprzenieDzialanie = aktualneDzialanie
    aktualneDzialanie = ''
}

const zaktualizujWynik = () =>
{
    wynikAktualne.innerText = aktualneDzialanie
    if(operacja != null){
       wynikPoprzednie.innerText = poprzenieDzialanie + operacja 
    }else{
        wynikPoprzednie.innerText = ''
    }
    
}

const dodajLiczbe = (liczba) =>
{
    if(liczba === '.'){
        if(aktualneDzialanie.includes('.')){
            return
        }
        liczba = '.'
    }
    aktualneDzialanie = aktualneDzialanie.toString() + liczba.toString()
}

const usunliczbe = () => {
    aktualneDzialanie = aktualneDzialanie.toString().slice(0, -1)
}

const wyczyscWynik = ()  => {
    
    aktualneDzialanie = ''
    poprzenieDzialanie = ''
    operacja = undefined
}

liczby.forEach((liczba) =>
{
    liczba.addEventListener('click', () => {
        dodajLiczbe(liczba.innerText)
        zaktualizujWynik()
    })
})

usun.addEventListener('click', () => {
    usunliczbe()
    zaktualizujWynik()
})

operatory.forEach((operator) => {
    operator.addEventListener('click', () =>{
        wybierzOperacje(operator.innerText)
        zaktualizujWynik()
    })
});
            
rownosc.addEventListener('click',() => {
      oblicz()
      zaktualizujWynik()
    })
wyczysc.addEventListener('click', () => {
    wyczyscWynik()
    zaktualizujWynik()
})