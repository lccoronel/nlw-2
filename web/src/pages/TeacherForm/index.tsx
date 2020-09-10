import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import PageHeader from '../../components/PageHeader';

import warningIcon from '../../assets/images/icons/warning.svg';

function TeacherForm() {
  const { push } = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems, 
      {
        week_day: 0,
        from: "",
        to: "",
      }
    ]);
  }

  function handleCreateClasses(e: FormEvent) {
    e.preventDefault();
    
    const data = {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    };

    api.post('classes', data).then(() => {
      alert('Cadastro realizado com sucesso');
      push('/');
    }).catch(() => alert('Erro no cadastro!'))
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrivel que você quer dar aulas."
        description="O primeiro passo é preencher esse formulario de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClasses}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input name="name" label="Nome completo" value={name} onChange={(e) => setName(e.target.value)} />
            <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => setBio(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select name="subject" label="Matéria" value={subject} onChange={(e) => setSubject(e.target.value)} options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciencias', label: 'Ciencias' },
              { value: 'ED. Fisica', label: 'Artes' },
              { value: 'Fisica', label: 'Fisica' },
              { value: 'Matematica', label: 'Matematica'},
              { value: 'Quimica', label: 'quimica'},
            ]}
            />

            <Input name="cost" label="Custo da hora por aula" value={cost} onChange={(e) => setCost(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>
              Horarios disponiveis
              <button type="button" onClick={addNewScheduleItem}>+ Novo horario</button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div className="schedule-item" key={scheduleItem.week_day}>
                  <Select 
                    name="week_day" 
                    label="Dia da semana" 
                    value={scheduleItem.week_day}
                    onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)} 
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda' },
                      { value: '2', label: 'Terça' },
                      { value: '3', label: 'Quarta' },
                      { value: '4', label: 'Quinta' },
                      { value: '5', label: 'Sexta'},
                      { value: '6', label: 'Sabado'},
                    ]}
                  />
                  <Input 
                    name="from" 
                    label="Das" 
                    type="time" 
                    value={scheduleItem.from}
                    onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                  />
                  <Input 
                    name="to" 
                    label="Ate" 
                    type="time" 
                    value={scheduleItem.to}
                    onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br/>
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;