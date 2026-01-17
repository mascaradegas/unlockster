# 🎬 Tour System Guide

## Como funciona o Tour em UNLOCK 2026

O tour é um sistema que guia você através de toda a experiência do jogo, navegando entre múltiplas páginas.

### **Caminho do Tour Completo:**

```
1. Landing Page (landing.html)
   ↓
2. Menu Index (index.html)
   ↓
3. Selecionar uma Aula
   ↓
4. Selecionar um Jogo
   ↓
5. Jogar o Game com Tutorial
```

---

## **Onde Começar o Tour**

### **Opção 1: Tour na Landing Page**
1. Abra `landing.html`
2. Clique no botão **🎬 Tour** (canto superior direito)
3. Navegue pelos passos do tour
4. No último passo, clique "Próximo" para ir ao menu de jogos
5. O tour continuará automaticamente no index.html

### **Opção 2: Tour no Menu (index.html)**
1. Abra `index.html` ou vá do tour da landing
2. Clique no botão **🎬 TOUR** (appbar)
3. Navegue pelos 10 passos
4. Aprenda como escolher aulas, modos e dificuldades

### **Opção 3: Tour no Game**
1. Selecione uma aula no index.html
2. Selecione um modo (Relaxado, Easy, Normal, Hard)
3. O game é executado com explicações visuais

---

## **Arquivos do Tour System**

### **`assets/tour-manager.js`**
- Gerencia o estado do tour globalmente
- Coordena navegação entre páginas
- Salva progresso em localStorage

### **`landing.html`**
- Tour spotlight da landing page
- Explica valor do projeto
- Navega para o index ao final

### **`index.html`**
- Tour modal do menu principal
- Explica como escolher aulas e modos
- Botão **🎬 TOUR** na appbar

### **Games** (word-drop, word-match, word-stack)
- Tours específicos para cada jogo
- Explicam mecânicas do game
- Mostram como jogar

---

## **Estrutura de um Tour Step**

Cada passo tem:
```javascript
{
  title: "📝 Título",
  content: "Descrição do passo",
  element: ".classe-do-elemento",  // Elemento a destacar
  position: "top|bottom|left|right|center",
  action: () => { /* navegação opcional */ }
}
```

---

## **Para Desenvolvedores: Adicionar um Novo Tour**

### **1. Criar um módulo de tour em qualquer página:**

```javascript
window.myPageTour = {
  steps: [
    {
      title: "Step 1",
      content: "Descrição",
      element: ".meu-elemento",
      position: "bottom"
    }
  ],

  show: function(step) {
    // Mostrar o tour a partir do step
  }
};
```

### **2. Chamar o tour:**

```javascript
function startMyTour() {
  tourManager.startTour();
}
```

### **3. Incluir tour-manager.js:**

```html
<script src="./assets/tour-manager.js"></script>
```

---

## **Dados Salvos do Tour**

O tour salva seu progresso em `localStorage` com a chave `tour_state`:

```javascript
{
  "active": true,
  "currentPage": "landing",
  "currentStep": 0,
  "completedPages": []
}
```

Quando você recarrega a página, o tour **continua automaticamente** de onde parou!

---

## **Próximos Passos**

- [ ] Integrar tours nos games (word-drop, word-match, word-stack)
- [ ] Adicionar transições animadas entre páginas
- [ ] Criar tutorial de primeiro uso (show tour ao 1º acesso)
- [ ] Analytics de quais partes do tour os usuários completam

