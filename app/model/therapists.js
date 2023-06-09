const CoreDatamapper = require('./CoreDatamapper');
const client = require('../db/pg');
const debug = require("debug")("datamapper");
const errorModule = require("../service/error/errorHandling");


class Therapists extends CoreDatamapper {
    tableName = 'therapists';

    /**
     * permet de récupérer un thérapiste avec ses spécialités
     */
    async findTherapistsWithSpecialties(id) {
        const preparedQuery = {
            text: `SELECT t.lastname, t.firstname, s.label, t.gender FROM therapists t
            JOIN therapists_own_specialties ts ON ts.therapists_id = t.id
			JOIN specialties s ON s.id = ts.specialties_id 
            WHERE t.id = $1`,
            values: [id],
        };
        try {
        const result = await this.client.query(preparedQuery);

        return result.rows;
        } catch(err) {
            await errorModule.log(err,"Base de donnée");
        }
    }
    /**
     * permet de récupérer un thérapiste par son email
     */
    async findByEmail(email) {
        const preparedQuery = {
            text: `SELECT * FROM therapists t WHERE t.email = $1`,
            values: [email],
        };
        try {

        const result = await this.client.query(preparedQuery);

        return result.rows[0];
        } catch(err) {
            await errorModule.log(err,"Base de donnée");
        }
    }
    /**
     * permet de récupérer un thérapiste par son numéro de téléphone
     */
    async findByPhonenumber(phonenumber) {
        const preparedQuery = {
            text: `SELECT * FROM therapists t WHERE t.phonenumber = $1`,
            values: [phonenumber],
        };
        try {

        const result = await this.client.query(preparedQuery);

        return result.rows[0];
        } catch(err) {
            await errorModule.log(err,"Base de donnée");
        }
    }
    /**
     * permet de récupérer un thérapiste par son numéro d'adelinumber
     */
    async findByAdelinumber(adelinumber) {
        const preparedQuery = {
            text: `SELECT * FROM therapists t WHERE t.adelinumber = $1`,
            values: [adelinumber],
        };
        try {

        const result = await this.client.query(preparedQuery);

        return result.rows[0];
        } catch(err) {
            await errorModule.log(err,"Base de donnée");
        }
    }
    /**
     * permet de récupérer tous les thérapistes avec leurs spécialités
     */
    async AllTherapistsWithSpecialities() {
        const preparedQuery = {
            text: `SELECT t.lastname, t.firstname, s.label, t.id FROM therapists t
            JOIN therapists_own_specialties ts ON ts.therapists_id = t.id
			JOIN specialties s ON s.id = ts.specialties_id`,
        };

        try {
            const result = await this.client.query(preparedQuery);
            return result.rows;
        } catch (error) {
            console.error('Error in AllTherapistsWithSpecialities:', error); 
            throw error;
        }
    }
    /**
     * permet de rajouter une spécialité à un thérapeute
     */
    async addSpecialtiesToTherapist(therapistId, specialityId) {
        const preparedQuery = {
            text: `INSERT INTO therapists_own_specialties (therapists_id, specialties_id) VALUES ($1, $2) RETURNING *`,
            values: [therapistId, specialityId],
        };
        try {
        const result = await this.client.query(preparedQuery);

        return result.rows;
    } catch(err) {
        await errorModule.log(err,"Base de donnée");
    }
    }
    /**
     * permet de supprimer une spécialité à un thérapeute
     */
    async removeSpecialtiesFromTherapist(therapistId, specialityId) {
        const preparedQuery = {
            text: `DELETE FROM therapists_own_specialties WHERE therapists_id = $1 AND specialties_id = $2 RETURNING *`,
            values: [therapistId, specialityId],
        };
        try {
        const result = await this.client.query(preparedQuery);

        return result.rows;
    } catch (err) {
        await errorModule.log(err,"Base de donnée");
    }
    }
    /**
     * permet de récupérer tous les thérapeutes par leur genre avec leurs spécialités
     */
    async getAllTherapistsByGenderWithSpecialities(gender) {
        const preparedQuery = {
            text: `SELECT t.lastname, t.firstname, s.label, t.id, t.gender FROM therapists t
            JOIN therapists_own_specialties ts ON ts.therapists_id = t.id
			JOIN specialties s ON s.id = ts.specialties_id
			WHERE gender = $1`,
            values: [gender],
        };
        try {
        const result = await this.client.query(preparedQuery);

        return result.rows;
    } catch (err) {
        await errorModule.log(err,"Base de donnée");
    }
    }
    /**
     * permet de récupérer tous les thérapeutes par leur genre
     */
    async getAllTherapistsByGender(gender) {
        const preparedQuery = {
            text: `SELECT t.lastname, t.firstname, t.id, t.gender, t.phonenumber, t.email, t.streetname, t.city, t.complement, t.profilpresentation, t.audiosession,t.videosession, t.chatsession,t.sessionatoffice FROM therapists t
			WHERE gender = $1`,
            values: [gender],
        };
        try {
        const result = await this.client.query(preparedQuery);

        return result.rows;
        } catch (err) {
            await errorModule.log(err,"Base de donnée");
        }
    }
    /**
     * permet de récupérer tous les rendez-vous d'un thérapeute
     */
    async getAllAppointmentOfATherapist(id) {
        const preparedQuery = {
            text: `SELECT a.beginninghour, a.endtime, a.patients_id, t.videosession, t.audiosession, t.chatsession, t.sessionatoffice, t.email AS therapist_email, t.lastname AS therapist_lastname, t.firstname AS therapist_firstname, t.phonenumber AS therapist_phonenumber, p.profilpicture AS patient_profilepicture, t.streetname AS therapist_adress, t.zipcode AS therapist_zipcode, t.city AS therapist_city, t.complement AS therapist_adresscomplement, p.email AS patient_email, p.phonenumber AS patient_phonenumber, p.lastname AS patient_lastname, p.firstname AS patient_firstname,a.id AS appointment_id  FROM appointments a
            JOIN therapists t ON t.id = a.therapists_id
            JOIN patients p ON p.id = a.patients_id
            WHERE t.id = $1`,
            values: [id],
        
        };
        try {
        const result = await this.client.query(preparedQuery);

        return result.rows;
        } catch(err) {
            await errorModule.log(err,"Base de donnée");
        }
    }
    /**
     * permet de récupérer un rendez-vous d'un thérapeute
     */
    async getOneAppointmentOfATherapist(TherapistId, appointmentId) {
        const preparedQuery = {
            text: `SELECT a.beginninghour, a.endtime, a.patients_id, t.videosession, t.audiosession, t.chatsession, t.sessionatoffice, t.email AS therapist_email, t.lastname AS therapist_lastname, t.firstname AS therapist_firstname, t.phonenumber AS therapist_phonenumber, p.profilpicture AS patient_profilepicture, t.streetname AS therapist_adress, t.zipcode AS therapist_zipcode, t.city AS therapist_city, t.complement AS therapist_adresscomplement, p.email AS patient_email, p.phonenumber AS patient_phonenumber, p.lastname AS patient_lastname, p.firstname AS patient_firstname,a.id AS appointment_id  FROM appointments a
            JOIN therapists t ON t.id = a.therapists_id
            JOIN patients p ON p.id = a.patients_id
            WHERE t.id = $1 AND a.id = $2`,
            values: [TherapistId,appointmentId],
        
        };
        try {
        const result = await this.client.query(preparedQuery);

        return result.rows;
        } catch (err) {
            await errorModule.log(err,"Base de donnée");
        }
    }
    /**
     * permet de créer un rendez-vous avec un patient
     */
    async creatAppointmentWithOnePatient ({patientId,therapistId},appointment){
        const preparedQuery = {
            text:`INSERT INTO appointments
            (beginninghour, endtime, patients_id, therapists_id, videosession, audiosession, chatsession, sessionatoffice)
            VALUES (
                to_timestamp($1, 'DD-MM-YYYY HH24:MI')+ interval '1 hour',
                to_timestamp($2, 'DD-MM-YYYY HH24:MI')+ interval '1 hour',
                $3,
                $4,
                $5,
                $6,
                $7,
                $8
                
            )RETURNING * ;`,
        
            values : [appointment.beginninghour, appointment.endtime, 
                patientId,therapistId, appointment.videosession,
                appointment.audiosession,appointment.chatsession, appointment.sessionatoffice ],
        };
        try {
        const result = await this.client.query(preparedQuery);
        return result.rows;
        } catch (err) {
            await errorModule.log(err,"Base de donnée");
        }
    }
    /**
     * permet de récupérer tous les avis d'un thérapeute
     */
    async viewOneTherapistReviews(id) {
        const preparedQuery = {
            text:`SELECT r.messages AS patient_messages, r.negatifreviews AS badscore, r.positifreviews AS goodscore, p.firstname AS patient_firstname, p.lastname AS patient_lastname, p.id AS patient_id, p.profilpicture AS patient_profilpicture, t.lastname AS therapist_lastname, t.firstname AS therapist_firstname FROM reviews r
            JOIN therapists t  ON t.id = therapists_id
            JOIN patients p ON p.id = patients_id
            WHERE t.id = $1;`,
            values : [id],
        }
        try {
        const result = await this.client.query(preparedQuery);
        return result.rows;
        } catch (err) {
            await errorModule.log(err,"Base de donnée");
        }
    }
    /**
     * permet de récupérer tous les thérapeutes par spécialité
     */
    async findAllTherapistBySpecialties(id) {
        const preparedQuery = {
            text: `SELECT t.id ,t.lastname, t.firstname, s.label, t.id, t.gender, t.profilpicture, t.videosession, t.chatsession, t.sessionatoffice,t.audiosession, t.adelinumber, t.streetname, t.city, t.phonenumber,t.profilpresentation, t.complement, t.zipcode FROM therapists t
            JOIN therapists_own_specialties ts ON ts.therapists_id = t.id
			JOIN specialties s ON s.id = ts.specialties_id
			WHERE s.id = $1`,
            values: [id],
        };
        try {
        const result = await this.client.query(preparedQuery);

        return result.rows;
        } catch (err) {
            await errorModule.log(err,"Base de donnée");
        }
    }
    /**
     * permet de récupérer tous les thérapeutes par spécialité et par genre
     */
    async findAllTherapistBySpecialtiesAndGender(id,gender) {
        
        const preparedQuery = {
            text: `SELECT t.id ,t.lastname, t.firstname, s.label, t.id, t.gender, t.profilpicture, t.videosession, t.chatsession, t.sessionatoffice,t.audiosession, t.adelinumber, t.streetname, t.city, t.phonenumber,t.profilpresentation, t.complement, t.zipcode FROM therapists t
            JOIN therapists_own_specialties ts ON ts.therapists_id = t.id
			JOIN specialties s ON s.id = ts.specialties_id
			WHERE s.id = $1 AND t.gender = $2`,
            values: [id,gender],
        };
        try {
        const result = await this.client.query(preparedQuery);

        return result.rows;
        } catch {
            await errorModule.log(err,"Base de donnée");
        }
    }

    
}

module.exports = new Therapists(client);