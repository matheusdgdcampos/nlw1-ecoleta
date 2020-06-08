import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import api from "../../services/api";
import axios from "axios";

import "./styles.css";

import logo from "../../assets/logo.svg";

const CreatePoint = () => {
  /**
   * Sempre que setar um estado no typescript
   * declarar o tipo que vai ser manipulada manualmente.
   */

  interface Item {
    id: number;
    title: string;
    image_url: string;
  }

  interface UF {
    name: string;
  }

  interface IBGEUFResponse {
    sigla: string;
  }

  const [items, setItems] = useState<Item[]>([]);
  const [uf, setUfs] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");

  /**
   * Pegando os dados da API do backend.
   */
  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);
  /**
   * Pegando as UFs dos estados com a api do IBGE utilizando axios.
   */
  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    //carregar as cidades toda vez em que a UF mudar.
  }, []);
  /**
   * função que captura os eventos de mudança do select.
   *
   * @param event recebe como parâmetro o changeEvent e atribui ao changeEvent o elemento
   * que será monitorado em sua mudança, neste caso o select.
   */
  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da Entidade</label>
            <input type="text" name="name" id="name" />
          </div>
        </fieldset>

        <div className="field-group">
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="field">
            <label htmlFor="name">Whatsapp</label>
            <input type="text" name="whatsapp" id="whatsapp" />
          </div>
        </div>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={[-22.9988427, -43.5510806]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-22.9988427, -43.5510806]} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
              >
                <option value="0">Selecione uma UF</option>
                {uf.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma Cidade</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
