# Fluxos de usuário

> **Estado:** Aprovada (12/10/2026).
> **Última atualização:** 12/10/2026
> Fundamentação: [ux-audit.md](ux-audit.md) · Casos de uso: [../product/use-cases.md](../product/use-cases.md)

Os fluxos descrevem **o caminho** do usuário. As telas, seus estados e critérios detalhados ficam nos contratos de frontend (Etapa 05). Referências como "L2" e "C4" apontam para as recomendações da análise de UX.

Notação: `[Tela]` · `(ação)` · `→` próximo passo · `⟂` saída do sistema

---

## 1. Landing page

### F-LP-01 — Visitante no celular · UC-LP-01

```text
[Landing: abertura]
   ├─(toca "Converse sobre o seu caso")───────────────→ ⟂ App WhatsApp, mensagem preenchida
   └─(rola)→ [Faixa de sintomas] → [01 Problema] → [02 Demonstração] → [03 Diferença] → [04 Como começar] → [05 Perguntas]
                │   botão fixo no rodapé da tela disponível (L2)
                ├─(toca botão fixo)─────────────────────→ ⟂ App WhatsApp, mensagem preenchida
                └─→ [Chamada final] ─(toca)─────────────→ ⟂ App WhatsApp, mensagem preenchida
```

Interações até a conversão: **1 toque** a partir de qualquer ponto da página.

### F-LP-02 — Visitante no computador · UC-LP-01 A2

```text
[Landing: abertura]  (cabeçalho fixo com botão — L2)
   ├─(clica no botão)──→ ⟂ nova aba: WhatsApp Web ou app desktop (L7)
   └─(rola)→ ... → [04 Como começar] ou [CTA final]
                     ├─(clica no botão)───────────────→ ⟂ nova aba: WhatsApp Web
                     └─(anota o número exibido)───────→ chama pelo celular (CA-LP-06.5)
```

### F-LP-03 — Visitante sem WhatsApp · UC-LP-01 E1

```text
[Landing] ─(toca no botão)→ ⟂ página do WhatsApp (instalar ou usar a versão web)
[Landing] ─(lê o número exibido)→ salva o contato manualmente (CA-LP-06.5)
```

---

## 2. CRM

### F-CRM-01 — Entrar · UC-CRM-01

```text
[Login] ─(credenciais válidas)→ [Início]
        ─(inválidas)→ [Login] com erro genérico
        ─(tentativas demais)→ [Login] com bloqueio temporário informado
```

### F-CRM-02 — Rotina diária · UC-CRM-03, UC-CRM-05

```text
[Início]
  ├─ Faixa de projetos: vê fase, saúde e previsão; projetos com Atenção ou Bloqueado em destaque
  │     └─(clica em um projeto)→ [Projeto]
  └─ Quadro geral
        ├─(filtra por projeto)→ quadro filtrado
        ├─(criação rápida em "A fazer": título + projeto)→ tarefa no fim da coluna (C2)
        ├─(arrasta ou "Mover para…")→ tarefa muda de coluna (C3)
        └─(abre a tarefa)→ edita título ou prazo, ou exclui (confirmação simples)
```

Interações para mover uma tarefa: **1 gesto** a partir do login. Para criar uma: **digitar o título + escolher o projeto**.

### F-CRM-03 — Começar um projeto · UC-CRM-02

```text
[Projetos] ou [Início] ─(Novo projeto)→ [Formulário de projeto]
   ├─ cliente existente: seleciona
   └─ cliente novo: (Novo cliente) → [Formulário sobreposto de cliente] ─(salvar)→ volta com o cliente selecionado (C6)
   ─(salvar)→ [Projeto] com o quadro vazio e a próxima ação sugerida (C12)
```

### F-CRM-04 — Atualizar fase ou saúde · UC-CRM-04

```text
[Projeto] ─(altera o seletor de fase ou de saúde)→ salvo na hora, com confirmação breve (C4)
          ─(fase = Concluído ou Cancelado)→ aviso: a saúde deixa de ser acompanhada (C5)
                                              → o projeto sai da faixa do Início
[Projeto] ─(Editar)→ [Formulário de projeto] ─(salvar)→ [Projeto]
```

### F-CRM-05 — Consultar projetos encerrados · CA-CRM-05.2

```text
[Projetos] ─(filtro: Encerrados)→ lista ─(clica)→ [Projeto] com fase e tarefas editáveis
```

### F-CRM-06 — Excluir · RN-CRM-10, RN-CRM-11

```text
[Projeto] ─(Excluir)→ confirmação: "Excluir o projeto X e as N tarefas dele?" ─(confirma)→ [Projetos]
[Cliente] ─(Excluir)
     ├─ sem projetos → confirmação → [Clientes]
     └─ com projetos → mensagem com o motivo e o caminho (C8), sem excluir
```

### F-CRM-07 — Usar um modelo · UC-CRM-07

```text
[Modelos] ─(clica no nome do modelo)→ ⟂ download do arquivo original (C11)
          → edita no Word, fora do CRM
          ─(se o modelo mudou: Ações → Substituir arquivo)→ envia a nova versão → lista atualizada
```

### F-CRM-08 — Guardar um modelo · UC-CRM-06

```text
[Modelos] ─(Enviar modelo, ou arrastar o arquivo para a tela)→ [Formulário: nome + categoria]
          ─(salvar)→ modelo na categoria escolhida
          ─(formato ou tamanho inválido)→ erro com o motivo e os limites; nada é salvo
```

### F-CRM-09 — Organizar categorias · UC-CRM-08

```text
[Modelos] ─(Gerenciar categorias)→ criar, renomear ou excluir
          ─(excluir categoria com modelos)→ mensagem: "Há N modelos nesta categoria. Mova ou exclua os modelos antes."
```
