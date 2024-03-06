import { Router } from 'express';
import { HelloController } from "../controllers/HelloController";

const routes: Router = Router();
const helloController: HelloController = new HelloController();

routes.route('/hello').get(helloController.hello);
// // Contact
// routes.route('/contact')
//     // GET endpoint
//     .get(contactController.getContacts)
//     // POST endpoint
//     .post(contactController.addNewContact)

// // Contact detail
// routes.route('/contact/:contactId')
//     // get specific contact
//     .get(contactController.getContactWithId)
//     .put(contactController.updateContact)
//     .delete(contactController.deleteContact)

export default routes;
