import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    throw new Error('')
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' })
    }

    next()
  })
}

export default authenticateToken;