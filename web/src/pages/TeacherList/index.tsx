import React, { useState, FormEvent } from 'react';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {
  const [teachers, setTeachers] =useState([]);
  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTearchers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time
      }
    });

    setTeachers(response.data)
  }

  return (
    <div id="page-teacher-list" className="container">
     <PageHeader title="Estes são os proffys disponiveis.">
       <form id="search-teachers" onSubmit={searchTearchers}>
          <Select 
            name="subject" 
            label="Matéria" 
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciencias', label: 'Ciencias' },
              { value: 'ED. Fisica', label: 'Artes' },
              { value: 'Fisica', label: 'Fisica' },
              { value: 'Matematica', label: 'Matematica'},
              { value: 'Quimica', label: 'quimica'},
            ]}
          />
         <Select 
          name="week_day" 
          label="Dia da semana" 
          value={weekDay}
          onChange={e => setWeekDay(e.target.value)}
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
          type="time" 
          name="time" 
          label="Hora"
          value={time}
          onChange={e => setTime(e.target.value)} 
        />

        <button type="submit">
          Buscar
        </button>
       </form>
     </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem teacher={teacher} key={teacher.id} />
        })}
      </main>
    </div>
  )
}

export default TeacherList;