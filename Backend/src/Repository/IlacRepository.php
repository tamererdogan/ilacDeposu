<?php

namespace App\Repository;

use App\Entity\Ilac;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Ilac|null find($id, $lockMode = null, $lockVersion = null)
 * @method Ilac|null findOneBy(array $criteria, array $orderBy = null)
 * @method Ilac[]    findAll()
 * @method Ilac[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IlacRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Ilac::class);
    }

    // /**
    //  * @return Ilac[] Returns an array of Ilac objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Ilac
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
