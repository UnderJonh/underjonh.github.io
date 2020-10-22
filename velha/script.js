
		//DEIXA A DIV GAME ESCONDIDA
		window.onload =	function() { document.getElementById('game').style.visibility = 'hidden' };
		
		function Jogador(nome, forma) {
			this.nome = nome;
			this.forma = forma;
		}
		
		var jogador1, jogador2;
		//Jogador da rodada
		var jogadorAtual;
		var formas = ['X', 'O'];
		var index = null;

		/*
			0 1 2
			3 4 5
			6 7 8
		*/

		var tabuleiro = new Array(9);


		initGame = function() {
			var nomeJogador1 = document.getElementById('jogador1').value;
			var nomeJogador2 = document.getElementById('jogador2').value;
			jogador1 = new Jogador(nomeJogador1, 0); //X
			jogador2 = new Jogador(nomeJogador2, 1); //O

			jogadorAtual = jogador1;
			setLabelJogadorAtual();

			//APOS DEFINIÇÃO DE JOGADORES, EXIBE A DIV E INICIA JOGO
			document.getElementById('game').style.visibility = 'visible';
			
		}

		/*Reinicia a partida*/
		reset = function() { window.location.reload(); }
		
		/*Seta o nome do jogador da rodada na página HTML*/
		setLabelJogadorAtual = function() {
			document.getElementById('jogadorAtual').innerHTML = 'Jogador atual:  ' + jogadorAtual.nome;
		}

		/*Verifica se o tabuleiro está completamente preenchido, se estiver, significa que ninguém venceu a rodada*/
		tabuleiroIsFilled = function() {
			var preenchidos = 0;
				for(var i = 0; i < tabuleiro.length; i++)
					if(tabuleiro[i]	!= undefined) 
						preenchidos++;
				return preenchidos == tabuleiro.length;
		}

		/*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas linhas do tabuleiro, procurando um vencedor*/
		allElementsInSomeLine = function() {
			for( var i = 0; i < 7; i += 3) {
				if ( tabuleiro[i] == formas[0] && tabuleiro[i + 1] == formas[0] && tabuleiro[i + 2] == formas[0] ) { 
					alert (jogador1.nome + ' wins!!!');
					reset();
				}
				if ( tabuleiro[i] == formas[1] && tabuleiro[i + 1] == formas[1] && tabuleiro[i + 2] == formas[1] ) {
					alert (jogador2.nome + ' wins!!!');
					reset();
				}
			}
		}

		/*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas colunas do tabuleiro, procurando um vencedor*/
		allElementsInSomeColumn = function() {
			for( var i = 0; i < 3; i++) {
				if ( tabuleiro[i] == formas[0] && tabuleiro[i + 3] == formas[0] && tabuleiro[i + 6] == formas[0] ) { 
					alert (jogador1.nome + ' wins!!!');
					reset();
				}
				if ( tabuleiro[i] == formas[1] && tabuleiro[i + 3] == formas[1] && tabuleiro[i + 6] == formas[1] ) {
					alert (jogador2.nome + ' wins!!!');
					reset();
				}
			}

		}

		/*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas diagonais do tabuleiro, procurando um vencedor*/
		allElementsInSomeDiagonal = function() {
			if ( (tabuleiro[0] == formas[0] && tabuleiro[4] == formas[0] && tabuleiro[8] == formas[0]) ||
	 			 (tabuleiro[2] == formas[0] && tabuleiro[4] == formas[0] && tabuleiro[6] == formas[0])) {
					alert (jogador1.nome + ' wins!!!');
				reset();
			} else if ( (tabuleiro[0] == formas[1] && tabuleiro[4] == formas[1] && tabuleiro[8] == formas[1]) ||
					    (tabuleiro[2] == formas[1] && tabuleiro[4] == formas[1] && tabuleiro[6] == formas[1]) ) {
					alert (jogador2.nome + ' wins!!!');
				reset();
			} 
		}

		/*Preenche a célula da tabela HTML escolhida pelo usuário ao clicar, além de cuidar do jogador atual da rodada e chamar as funções
		  de verificação de algum ganhador */
		setOnCeil = function(cel, pos) { 
				if(tabuleiro[pos] == undefined) {
					cel.innerHTML = formas[jogadorAtual.forma];
					tabuleiro[pos] = formas[jogadorAtual.forma];

					//define o jogador da rodada
					(jogadorAtual.forma == 0) ? jogadorAtual = jogador2 : jogadorAtual = jogador1;
					setLabelJogadorAtual();

				} else alert('ei Não Da para Roubar Aqui');

				allElementsInSomeLine();
				allElementsInSomeColumn();
				allElementsInSomeDiagonal();
	
				if ( tabuleiroIsFilled() ) {
					alert ('Empate niguem ganho ;-;');
					reset();
				}
				
			
		}