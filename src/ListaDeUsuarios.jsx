import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import './listadeusuarios.css';
import axios from 'axios';
import logo from './assets/logo.png'
import user from './assets/user.png'
import email from './assets/email.png'
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Pegando as informações da API pelo GET
const ListaDeUsuarios = () => {
    const [infos, setInfos] = useState([])
    useEffect(() => {
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {
            method: 'GET',
        }).then((resposta) => {setInfos(resposta.data)})
    }, [])

// Mock com lista de cartões para teste
const cards = [
    // cartão válido
    {
      card_number: '1111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
    // cartão inválido
    {
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    },
];

// Função para pegar a escolha do cartão do input select
const escolhaDoCartao = (event) => {
    setValorCartao(event.target.value);
}

// Ações dos modais
const [abrirPagamento, setAbrirPagamento] = useState("none"); // Para abrir modal de pagamento
const [pegarUsuario, setPegarUsuario] = useState(""); // Para pegar o nome do usuário
const [abrirPagou, setAbrirPagou] = useState("none"); // Para abrir modal com recibo de pagamento
const [abrirNaoRecebeu, setAbrirNaoRecebeu] = useState(""); // Para msg de erro de pagamento
const [valorCartao, setValorCartao] = useState("1"); // Para pegar o cartão escolhido para pagamento
const [valorDinheiro, setValorDinheiro] = useState(""); // Para pegar o valor de pagamento digitado
const [validarCampo, setValidarCampo] = useState("none"); // Para validar campo de valor digitado

// Função para abrir o modal de pagamento do usuário
const abrirModalPagar = (name) => {
    setAbrirPagamento("flex")
    setPegarUsuario(name)
}

// Função que abre o modal de recibo de pagamento 
const abrirModalPagou = () => {
    if (valorDinheiro === "") {
        setValidarCampo("flex");
    } else 
        {
        if (valorCartao === "1") {
            setAbrirNaoRecebeu("");
        } else {
            setAbrirNaoRecebeu("não");
        }
        setAbrirPagamento("none");
        setAbrirPagou("flex");
        setValorDinheiro("");
        setValidarCampo("none");
    }
}

// Função para fechar o modal do recibo de pagamento
const fecharModal = () => {
    setAbrirPagou("none");
}

const closeModal = () => {
    setAbrirPagamento("none");
}

// Função para validar campo de valor para pagamento do usuário
const valorInput = (event) => {
    setValorDinheiro(event.target.value);
    setValidarCampo("none");
}

// Renderizando na tela as informações recebidas da API 
    return (
        <>
        <div className="header">
            <div className="alinhamento">
                <img className="logo" src={logo} height="20"/>
                <strong className="title" data-testid="header-title">PAY CARD</strong>
            </div>
        </div>
            <section className="grid-section" data-testid="section">

            {infos.map(item => (
                <div className="container" key={item.index} data-testid="custom-element">
                    <div className="content">
                        <img className="thumbnail" src={item.img} alt="Foto do usuário" />
                        
                        <div className="infos">
                            <div className="userDiv">
                                <img src={user} width="30px" />
                                <p className="width"><strong>{item.name}</strong></p>
                            </div>
                            <div className="userDiv">
                                <img src={email} width="30px" />
                                <p><strong>{item.username}</strong></p>
                            </div>
                        </div>
                        
                        <button alt="Pagar" onClick={()=>{abrirModalPagar(item.name)}}>Pagar</button>
                    </div>
                </div>
            ))}

            {/*--------------------------------Abrir Modal de pagamento----------------------------------*/}
            <div className="abrirModal" style={{display: abrirPagamento}} data-testid="abrirModal">
                <div className="texto-cabecalho-modal">
                    <p>Pagamento para <span>{pegarUsuario}</span></p>
                    <button className="" onClick={()=>{closeModal()}}>X</button>
                </div>
                <div className="valorInput">
                <NumberFormat thousandSeparator={true} className="input" value={valorDinheiro} onChange={valorInput} prefix={'R$ '} inputmode="numeric" placeholder="R$ 0,00"/>
                <p style={{display:validarCampo}}>Campo obrigatório</p>
                </div>
                <select value={valorCartao} onChange={escolhaDoCartao}>
                <option value="1">Cartão com final {cards[0].card_number.substr(-4)}</option>
                <option value="2">Cartão com final {cards[1].card_number.substr(-4)}</option>
                </select>
                {/* <button>Cancelar</button> */}
                <button onClick={()=>{abrirModalPagou ()}}>Pagar</button>
            </div>  

            {/*------------------------------Abrir Modal de recibo de pagamento--------------------------------*/}
            <div className="abrirModal" style={{display: abrirPagou}} data-testid="modalPagamento">
                <p className="texto-cabecalho-modal">Recibo de pagamento</p>
                <div className="texto-corpo-modal">
                    <p>O Pagamento <b>{abrirNaoRecebeu}</b> foi concluído com sucesso.</p>
                </div>
                <button classname="abrirModalButton" onClick={()=>{fecharModal()}}>Fechar</button>
            </div>

            </section>
        </>
    )
}

export default ListaDeUsuarios