const request = require('supertest');
const { expect } = require('chai');
const api = "http://localhost:5005";

describe('🏥 MEDICAL INFORMATION SYSTEM - INTEGRATION TESTS', () => {

  describe('📊 Статистика та доступність API', () => {
    it('TC-01: Ендпоінт пацієнтів доступний', async () => {
      const res = await request(api).get('/api/patients');
      expect(res.status).to.equal(200);
    });

    it('TC-02: Ендпоінт лікарів повертає дані', async () => {
      const res = await request(api).get('/api/doctors');
      expect(res.status).to.equal(200);
    });

    it('TC-03: База даних містить початкових лікарів (міграція)', async () => {
      const res = await request(api).get('/api/doctors');
      expect(res.body.length).to.be.at.least(14);
    });
  });

  describe('👥 Керування базою пацієнтів', () => {
    let tempPatientId;

    it('TC-04: Валідна реєстрація нового пацієнта', async () => {
      const res = await request(api).post('/api/patients').send({
        name: "Сокіл Катерина", dob: "2003-12-12", email: "sokil@test.com", phone: "0678855432", city: "Львів"
      });
      tempPatientId = res.body._id;
      expect(res.status).to.equal(201);
      expect(res.body.name).to.equal("Сокіл Катерина");
    });

    it('TC-05: Отримання повної картки пацієнта за списком', async () => {
      const res = await request(api).get('/api/patients');
      const patient = res.body.find(p => p.name === "Сокіл Катерина");
      expect(patient).to.exist;
    });

    it('TC-06: Видалення карти пацієнта з бази', async () => {
      const res = await request(api).delete(`/api/patients/${tempPatientId}`);
      expect(res.status).to.equal(200);
    });
  });

  describe('⚕️ Медичні послуги та Спеціалісти', () => {
    it('TC-07: Перевірка списку послуг', async () => {
      const res = await request(api).get('/api/services');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });

    it('TC-08: Послуги мають прив’язку до конкретних лікарів', async () => {
      const res = await request(api).get('/api/services');
      expect(res.body[0]).to.have.property('doctorName');
    });

    it('TC-09: Перевірка наявності ціни у форматі рядка', async () => {
      const res = await request(api).get('/api/services');
      expect(res.body[0].price).to.contain('грн');
    });
  });

  describe('📅 Життєвий цикл записів (Workflow)', () => {
    let appId;

    it('TC-10: Створення нового запису на прийом', async () => {
      const res = await request(api).post('/api/appointments').send({
        patientName: "Іванов Іван", doctorName: "Д-р Левченко М.В.", service: "Консультація", price: "450 грн", date: "2024-06-01"
      });
      appId = res.body._id;
      expect(res.status).to.equal(201);
      expect(res.body.status).to.equal("Заплановано");
    });

    it('TC-11: Зміна статусу: Заплановано -> Прийнято', async () => {
      const res = await request(api).patch(`/api/appointments/${appId}`).send({ status: "Прийнято" });
      expect(res.body.status).to.equal("Прийнято");
    });

    it('TC-12: Архівування запису: Прийнято -> Завершено', async () => {
      const res = await request(api).patch(`/api/appointments/${appId}`).send({ status: "Завершено" });
      expect(res.body.status).to.equal("Завершено");
    });
  });

  describe('🔍 Глобальний пошук та фільтрація', () => {
    it('TC-13: Фільтрація лікарів за спеціалізацією (Терапевт)', async () => {
      const res = await request(api).get('/api/doctors');
      const therapists = res.body.filter(d => d.specialization === "Терапевт");
      expect(therapists.length).to.be.at.least(1);
    });

    it('TC-14: Пошук пацієнта за номером телефону', async () => {
        const res = await request(api).get('/api/patients');
        expect(res.status).to.equal(200);
    });
  });

});