function criarCalculadora() {
    return {
        display: document.querySelector('#display'),
        showing: document.querySelector('#showing'),
        btnClear: document.querySelector('.btn-clear'),
        calculated: false,

        start() {
            this.clickButtons()
            this.enter()
        },

        clickButtons() {
            const math = ['+', '-', '*', '/', '='];
            document.addEventListener('click', e => {
                const el = e.target;
                if (math.includes(el.innerText)) return this.showingValues(el.innerText);
                if (el.classList.contains('btn-num')) this.displayValues(el.innerText);
                if (el.classList.contains('btn-clear')) this.clearAll();
                if (el.classList.contains('btn-del')) this.deleteOne();
                if (el.classList.contains('btn-equals')) this.count();
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
            const math = ['+', '-', '*', '/'];
            let showing = this.showing.innerText;
            let display = this.display.value;

           
            if (display !== '' && value === '(' && !math.some(op => display.endsWith(op))) {
                this.display.value += '*';
            }
            if (!this.display.value && value === '.') return
            if (this.display.value.split('.').length - 1 > 0 && value === '.') return
           
            if (this.display.value.endsWith('.') && value === '.') return
            this.display.value += value;
        },

        showingValues(value) {
            const math = ['+', '-', '*', '/'];
            let showing = this.showing.innerText;
            let display = this.display.value;
            if (display.endsWith('(') && math.includes(value)) return;
            if (this.calculated && math.includes(value)) {
                this.showing.innerText = display + value;
                this.display.value = '';
                this.calculated = false;
                return;
            }
            if (!showing && !display && (value === '*' || value === '/')) return;
            if (math.some(op => showing.endsWith(op)) && math.includes(value)) {
                if (!display) {
                    this.showing.innerText = showing.slice(0, -1);
                    this.showing.innerText += value;
                    return;
                }
            }
            if (value === '=') {
                if (showing.includes('(') && !showing.includes(')')) {
                    this.showing.innerText += display + ')';
                    this.count(this.showing.innerText);
                    return

                }
                this.showing.innerText += display;
                this.count(this.showing.innerText);
                return;
            }
            this.showing.innerText += this.display.value + value;
            this.display.value = '';
        },

        count(value) {
            try {
                const result = eval(value || this.showing.innerText);
                this.display.value = result;
                this.calculated = true;
            } catch (error) {
                alert('Conta inválida');
                this.showing.innerText = '';
                this.display.value = '';

            }
        },
    }
}

const calculadora = criarCalculadora()
calculadora.start()