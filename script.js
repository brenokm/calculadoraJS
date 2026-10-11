/* factory function retorna objetos */
function criarCalculadora() {
    return {
        display: document.querySelector('#display'),
        btnClear: document.querySelector('.btn-clear'),
        start() {
            this.clickButtons()
            this.enter()
        },
        enter() {
            this.display.addEventListener('keyup', e => {
                console.log(e)
                if (e.key === 'Enter') this.count();
            })
        },
        clickButtons() {
            document.addEventListener('click', e => {
                
                if (el.classList.contains('btn-num')) this.btnToDisplay(el.innerText);
                if (el.classList.contains('btn-clear')) this.clearDisplay();
                if (el.classList.contains('btn-del')) this.deleteOne(el.innerText);
                if (el.classList.contains('btn-equals')) this.count(el.innerText);
            })
        },
        btnToDisplay(value) {
            this.display.value += value;
        },
        clearDisplay() {
            this.display.value = ''
        },
        deleteOne(value) {
            this.display.value = this.display.value.slice(0, -1)
        },
        count() {
            let count = this.display.value;
            try {
                count = eval(count)
                if (!count) return alert('conta inválida')
                this.display.value = count
            } catch (error) {
                return alert('conta inválida')
            }
        }
    }
}

const calculadora = criarCalculadora()
calculadora.start()