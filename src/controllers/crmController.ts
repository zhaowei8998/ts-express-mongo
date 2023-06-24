import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/mongoose/crmModel';
import { Request, Response } from 'express';
import ResultJson from '../common/ResultCode'
const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController {

    public addNewContact(req: Request, res: Response) {
        let newContact = new Contact(req.body);
        newContact.save();
        res.send(JSON.stringify(ResultJson.getSuccess()))
    }

    public async getContacts(req: Request, res: Response) {
        const result = await Contact.find({});
        res.send(JSON.stringify(ResultJson.getSuccessData(result)))
    }

    public async getContactWithId(req: Request, res: Response) {
        const result = await Contact.findById(req.params.contactId);
        res.send(JSON.stringify(ResultJson.getSuccessData(result)))
    }

    public async updateContact(req: Request, res: Response) {
        const result = await Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true });
        res.send(JSON.stringify(ResultJson.getSuccessData(result)))
    }

    public async deleteContact(req: Request, res: Response) {
        const result = await Contact.deleteOne({ _id: req.params.contactId });
        res.send(JSON.stringify(ResultJson.getSuccessData(result)))
    }
}