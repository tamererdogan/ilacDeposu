<?php

namespace App\Repository;

use App\Entity\Etken;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Etken|null find($id, $lockMode = null, $lockVersion = null)
 * @method Etken|null findOneBy(array $criteria, array $orderBy = null)
 * @method Etken[]    findAll()
 * @method Etken[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EtkenRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Etken::class);
    }

    // /**
    //  * @return Etken[] Returns an array of Etken objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Etken
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
