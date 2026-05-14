const mongoose = require('mongoose');

// Підключення до бази (Docker використовує внутрішню назву 'mongodb')
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/his_db';

const seed = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("🚀 Початок міграції (Консультації для всіх лікарів)...");

    await mongoose.connection.db.dropDatabase();

    const Doctor = mongoose.model('Doctor', new mongoose.Schema({ 
        name: String, 
        specialization: String, 
        experience: Number, 
        room: String, 
        schedule: String 
    }));
    
    const Service = mongoose.model('Service', new mongoose.Schema({ 
        name: String, 
        doctorName: String, 
        price: String 
    }));

    // 1. Список лікарів
    const doctorsData = [
      {name: "Д-р Левченко Марина В.", specialization: "Терапевт", experience: 12, room: "204", schedule: "08:00-14:00"},
      {name: "Д-р Козак Василь П.", specialization: "Терапевт", experience: 8, room: "205", schedule: "14:00-20:00"},
      {name: "Д-р Кравчук Олег П.", specialization: "Хірург", experience: 20, room: "105", schedule: "10:00-18:00"},
      {name: "Д-р Мельник Віктор Г.", specialization: "Хірург", experience: 15, room: "106", schedule: "08:00-15:00"},
      {name: "Д-р Коваленко Світлана М.", specialization: "Кардіолог", experience: 15, room: "210", schedule: "08:00-16:00"},
      {name: "Д-р Сидоренко Ігор І.", specialization: "Кардіолог", experience: 10, room: "211", schedule: "09:00-17:00"},
      {name: "Д-р Ткач Ганна С.", specialization: "Невролог", experience: 7, room: "301", schedule: "09:00-15:00"},
      {name: "Д-р Петренко Юлія О.", specialization: "Стоматолог", experience: 11, room: "401", schedule: "09:00-16:00"},
      {name: "Д-р Іванов Сергій М.", specialization: "Стоматолог-хірург", experience: 18, room: "402", schedule: "10:00-19:00"},
      {name: "Д-р Сокіл Андрій В.", specialization: "Офтальмолог", experience: 9, room: "305", schedule: "09:00-18:00"},
      {name: "Д-р Мороз Олена Д.", specialization: "Дерматолог", experience: 6, room: "505", schedule: "10:00-18:00"},
      {name: "Д-р Гриценко Петро О.", specialization: "Отоларинголог", experience: 14, room: "308", schedule: "09:00-16:00"},
      {name: "Д-р Клименко Юрій В.", specialization: "Лікар МРТ/КТ", experience: 16, room: "001", schedule: "24/7"},
      {name: "Д-р Ярмолюк Анастасія Р.", specialization: "Лікар УЗД", experience: 5, room: "102", schedule: "09:00-19:00"}
    ];

    await Doctor.create(doctorsData);

    // 2. Список послуг (Консультація для кожного + процедури)
    const servicesData = [
      // Левченко (Терапевт)
      {name: "Консультація терапевта", doctorName: "Д-р Левченко Марина В.", price: "450 грн"},
      {name: "Загальний огляд", doctorName: "Д-р Левченко Марина В.", price: "400 грн"},
      {name: "Вакцинація", doctorName: "Д-р Левченко Марина В.", price: "300 грн"},
      
      // Козак (Терапевт)
      {name: "Консультація терапевта", doctorName: "Д-р Козак Василь П.", price: "450 грн"},
      {name: "Виїзд лікаря додому", doctorName: "Д-р Козак Василь П.", price: "1200 грн"},
      
      // Кравчук (Хірург)
      {name: "Консультація хірурга", doctorName: "Д-р Кравчук Олег П.", price: "600 грн"},
      {name: "Первинна обробка ран", doctorName: "Д-р Кравчук Олег П.", price: "450 грн"},
      
      // Мельник (Хірург)
      {name: "Консультація хірурга", doctorName: "Д-р Мельник Віктор Г.", price: "600 грн"},
      {name: "Видалення новоутворень", doctorName: "Д-р Мельник Віктор Г.", price: "1800 грн"},
      
      // Коваленко (Кардіолог)
      {name: "Консультація кардіолога", doctorName: "Д-р Коваленко Світлана М.", price: "550 грн"},
      {name: "Ехокардіографія (УЗД серця)", doctorName: "Д-р Коваленко Світлана М.", price: "850 грн"},
      
      // Сидоренко (Кардіолог)
      {name: "Консультація кардіолога", doctorName: "Д-р Сидоренко Ігор І.", price: "550 грн"},
      {name: "Холтер-моніторинг", doctorName: "Д-р Сидоренко Ігор І.", price: "1100 грн"},
      
      // Ткач (Невролог)
      {name: "Консультація невролога", doctorName: "Д-р Ткач Ганна С.", price: "600 грн"},
      {name: "Лікувальна блокада", doctorName: "Д-р Ткач Ганна С.", price: "950 грн"},
      
      // Петренко (Стоматолог)
      {name: "Консультація та огляд", doctorName: "Д-р Петренко Юлія О.", price: "300 грн"},
      {name: "Професійна чистка", doctorName: "Д-р Петренко Юлія О.", price: "900 грн"},
      
      // Іванов (Стоматолог-хірург)
      {name: "Консультація стоматолога-хірурга", doctorName: "Д-р Іванов Сергій М.", price: "400 грн"},
      {name: "Видалення зуба мудрості", doctorName: "Д-р Іванов Сергій М.", price: "1500 грн"},
      
      // Сокіл (Офтальмолог)
      {name: "Консультація офтальмолога", doctorName: "Д-р Сокіл Андрій В.", price: "450 грн"},
      {name: "Перевірка зору", doctorName: "Д-р Сокіл Андрій В.", price: "300 грн"},
      
      // Мороз (Дерматолог)
      {name: "Консультація дерматолога", doctorName: "Д-р Мороз Олена Д.", price: "500 грн"},
      {name: "Дерматоскопія", doctorName: "Д-р Мороз Олена Д.", price: "400 грн"},
      
      // Гриценко (ЛОP)
      {name: "Консультація отоларинголога", doctorName: "Д-р Гриценко Петро О.", price: "500 грн"},
      {name: "Промивання мигдаликів", doctorName: "Д-р Гриценко Петро О.", price: "350 грн"},
      
      // Клименко (МРТ/КТ)
      {name: "Опис результатів дослідження", doctorName: "Д-р Клименко Юрій В.", price: "500 грн"},
      {name: "МРТ головного мозку", doctorName: "Д-р Клименко Юрій В.", price: "2200 грн"},
      {name: "КТ легень", doctorName: "Д-р Клименко Юрій В.", price: "1800 грн"},
      
      // Ярмолюк (УЗД)
      {name: "Консультація за результатами УЗД", doctorName: "Д-р Ярмолюк Анастасія Р.", price: "300 грн"},
      {name: "УЗД черевної порожнини", doctorName: "Д-р Ярмолюк Анастасія Р.", price: "650 грн"},
      {name: "УЗД щитоподібної залози", doctorName: "Д-р Ярмолюк Анастасія Р.", price: "500 грн"}
    ];

    await Service.create(servicesData);

    console.log(`✅ Міграція завершена! Додано ${doctorsData.length} лікарів та ${servicesData.length} послуг.`);
    process.exit();
  } catch (err) {
    console.error("❌ Помилка міграції:", err);
    process.exit(1);
  }
};

seed();