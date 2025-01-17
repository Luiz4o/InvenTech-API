import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpResponse } from '../controllers/protocols';



// Middleware de validação do token
function authenticateToken(req: Request, res: Response, next: NextFunction): void  {
  const token = req.header('Authorization')?.split(' ')[1]; // Pega o token do cabeçalho

  if (!token) {
    throw new Error('')
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    next();
  });
}

export default authenticateToken;