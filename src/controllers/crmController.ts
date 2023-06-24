import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/mongoose/crmModel';
import { Request, Response } from 'express';
import ResultJson from '../common/ResultCode'
import ConcatService from '../service/ContactService'

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController {

    public addNewContact(req: Request, res: Response) {
        const ConcatServiceImpl = new ConcatService();
        try {
            ConcatServiceImpl.add(req.body)
            res.send(JSON.stringify(ResultJson.getSuccess()))
        } catch (error) {
            res.send(JSON.stringify(ResultJson.getFailureData(error)))
        }
    }

    public async getContacts(req: Request, res: Response) {
        try {
            const result = await Contact.find({});
            res.send(JSON.stringify(ResultJson.getSuccessData(result)))
        } catch (error) {
            res.send(JSON.stringify(ResultJson.getFailureData(error)))
        }
    }

    public async getContactWithId(req: Request, res: Response) {
        try {
            const result = await Contact.findById(req.params.contactId);
            res.send(JSON.stringify(ResultJson.getSuccessData(result)))
        } catch (error) {
            res.send(JSON.stringify(ResultJson.getFailureData(error)))
        }
    }

    public async updateContact(req: Request, res: Response) {
        try {
            const result = await Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true });
            res.send(JSON.stringify(ResultJson.getSuccessData(result)))
        } catch (error) {
            res.send(JSON.stringify(ResultJson.getFailureData(error)))
        }
    }

    public async deleteContact(req: Request, res: Response) {
        try {
            const result = await Contact.deleteOne({ _id: req.params.contactId });
            res.send(JSON.stringify(ResultJson.getSuccessData(result)))
        } catch (error) {
            res.send(JSON.stringify(ResultJson.getFailureData(error)))
        }
    }
}