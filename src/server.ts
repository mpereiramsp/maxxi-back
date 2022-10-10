import express, { Request, Response } from 'express';
import cors from "cors";
import db from "./database/connection";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  app.use(cors());
  next();
});

// Route to List Professional
app.get('/', async (rrequest: Request, response: Response) => {

  const users = await db("users").innerJoin("profession", "users.tipoDeProfissional", "=", "profession.id").select(["users.*", "profession.descricao"]);

  return response.json(users);
});

// Route to Get Professional
app.get('/user/:id', async (request: Request, response: Response) => {

  const { id } = request.params;

  const user = await db("users").innerJoin("profession", "users.tipoDeProfissional", "=", "profession.id").where("users.id", id);

  return response.json({ message: 'User encontrada', user: user});
});

// Route to Add Professional
app.post('/user', async (request: Request, response: Response) => {

  const { nome, telefone, email, tipoDeProfissional, situacao } = request.body;

  const timestamp = Date.now();

  await db("users").insert({
    nome,
    telefone,
    email,
    tipoDeProfissional,
    situacao,
    updated_at: timestamp,
    created_at: timestamp
  });
   
  return response.json({ message: 'User adicionada com sucesso', user: nome});
});

// Route to Edit Professional
app.put('/user/:id', async (request: Request, response: Response) => {

  const { id } = request.params;
  const { nome, telefone, email, tipoDeProfissional, situacao } = request.body;

  const timestamp = Date.now();

  await db("users").where("id", id).update({
    nome,
    telefone,
    email,
    tipoDeProfissional,
    situacao,
    updated_at: timestamp
  });

  return response.json({ message: 'User Editado com sucesso'});
});

// Route to Delete Professional
app.delete('/user/:id', async (request: Request, response: Response) => {

  const { id } = request.params;

  await db("users").where("id", id).del();

  return response.json({ message: 'User deletado com sucesso'});
});




// Route to List Profession
app.get('/profession', async (request: Request, response: Response) => {

  const professions = await db("profession");

  return response.json(professions);
});

// Route to Get Profession
app.get('/profession/:id', async (request: Request, response: Response) => {

  const { id } = request.params;

  const profession = await db("profession").where("id", id);

  return response.json({ message: 'Profissão encontrada', profissao: profession});
});

// Route to Add Profession
app.post('/profession', async (request: Request, response: Response) => {

  const { descricao, situacao } = request.body;

  const timestamp = Date.now();

  await db("profession").insert({
    descricao,
    situacao,
    updated_at: timestamp,
    created_at: timestamp
  });
   
  return response.json({ message: 'Profissão adicionada com sucesso', profissao: descricao});
});

// Route to Edit profession
app.put('/profession/:id', async (request: Request, response: Response) => {

  const { id } = request.params;
  const { descricao, situacao } = request.body;

  const timestamp = Date.now();

  await db("profession").where("id", id).update({
    descricao,
    situacao,
    updated_at: timestamp
  });

  return response.json({ message: 'Profissão Editada com sucesso'});
});

// Route to Delete profession
app.delete('/profession/:id', async (request: Request, response: Response) => {

  const { id } = request.params;

  await db("profession").where("id", id).del();

  return response.json({ message: 'Profissão deletada com sucesso'});
});


app.listen(3333);