/* factory function retorna objetos */
function criarCalculadora() {
    return {
        display: document.querySelector('#display'),
        showing: document.querySelector('#showing'),
        btnClear: document.querySelector('.btn-clear'),

        start() {
            this.clickButtons()
            this.enter()
        },

        clickButtons() {
            const math = ['+', '-', '*', '/', '='];

            document.addEventListener('click', e => {
                const el = e.target;
                if (math.includes(el.innerText)) return this.showingValues(el.innerText);
                //if ((el.classList.contains('right') || el.classList.contains('point')) && !this.display.value) return;
                if (el.classList.contains('btn-num')) this.displayValues(el.innerText);
                if (el.classList.contains('btn-clear')) this.clearAll();
                if (el.classList.contains('btn-del')) this.deleteOne();
                if (el.classList.contains('btn-equals')) this.equal();
            })

        },
        enter() {
            this.display.addEventListener('input', () => {
                this.display.value = this.display.value.replace(/[^0-9+\-*/().]/g, ''); /*REGEX*/
            });
            this.display.addEventListener('keydown', e => {
                if (e.key === 'Enter') this.count();
            })
        },

        deleteOne() {
            this.display.value = this.display.value.slice(0, -1);
        },

        clearAll() {
            this.display.value = '';
            this.showing.innerText = ''
        },

        displayValues(value) {
            this.display.value += value;
        },

        showingValues(value) {
            if (value === '=') {
                this.showing.innerText += this.display.value;
                this.display.value = '';
                this.count(this.showing.innerText)
                return;
            }
            this.showing.innerText += this.display.value + value;
            this.display.value = ''
        },

        count(value) {

            try {
                count = value
                count = eval(count)
                this.display.value = count
                
            } catch (error) {
                alert("conta inválida")
            }

        }



    }
}

const calculadora = criarCalculadora()
calculadora.start()