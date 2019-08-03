<?php

namespace App\Controller;

use const http\Client\Curl\Features\HTTP2;
use http\Env\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
//use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Swagger\Annotations as SWG;
use App\Entity\Ilac;
use App\Entity\Etken;

class MainController extends AbstractController
{
    /**
     * Tüm ilaçları Gösterme
     *
     * @Route("rest/v1/depo/{depoKodu}/ilac/{sayfa}", methods={"GET"})
     *     
     */
    public function getAllAction(String $depoKodu, $sayfa)
    {   
    	$result = "{\"ilaclar\":[";
    	$ilaclar = $this->getDoctrine()
    					->getRepository(Ilac::class)
    					->findBy(array('depoKod' => $depoKodu ), array('id' => 'ASC'), 10, $sayfa*10);                        

    	foreach ($ilaclar as $ilac) {
    		$result .= $ilac->toJson().",";
    	}

    	$result = rtrim($result, ",");
    	$result .= "]}";

        return new JsonResponse($result, 200, [], true);
    }

    /**
     * İlaç Sayısı
     *
     * @Route("rest/v1/depo/{depoKodu}/ilacSayisi/", methods={"GET"})
     *     
     */
    public function getCount(String $depoKodu)
    {   
        $result = "{\"ilaclar\":[";
        $ilacSayisi = count($this->getDoctrine()
                        ->getRepository(Ilac::class)
                        ->findBy(array('depoKod' => $depoKodu )));

        return new JsonResponse('{"ilacSayisi":"'.$ilacSayisi.'"}', 200, [], true);
    }

    /**
     * İlaç Gösterme
     *
     * @Route("rest/v1/depo/{depoKodu}/ilac/{ilacKodu}", name="api_get", methods={"POST"})
     *
     */
    public function getAction(String $ilacKodu, String $depoKodu)
    {   
    	$result = "";
    	$ilac = $this->getDoctrine()
					->getRepository(Ilac::class)
					->findOneBy(array('kod' => $ilacKodu, "depoKod" => $depoKodu ));

    	if (!$ilac) {
            return new JsonResponse('{"message":"İlaç bulunamadı."}', 404, [], true);
    	}

    	$result .= $ilac->toJson();

        return new JsonResponse($result, 200, [], true);
    }

    /**
     * İlaç Ekleme
     *
     * @Route("rest/v1/depo/{depoKodu}/ilac/", name="api_add", methods={"POST"})
     *
     */
    public function addAction(Request $request, String $depoKodu)
    {    	
    	$req = json_decode($request->getContent());        
    	$ilacBilgileri = $req->ilac;
    	$etkenler = $req->ilac->etkenler;

    	$ilac = $this->getDoctrine()
    				->getRepository(Ilac::class)
    				->findBy(array('kod' => $ilacBilgileri->kodu,'depoKod' => $depoKodu ));    				

    	if ($ilac) {
            return new JsonResponse('{"message":"Bu ilaç bu depo için daha önceden kaydedilmiş."}', 404, [], true);
    	}
    	    	    	
    	//Gelen veri özel karakter içeriyor mu?
    	$kontrol = 0;
    	$kontrol += preg_match_all('/[^\w]/', $ilacBilgileri->adi);
    	$kontrol += preg_match_all('/[^\w]/', $ilacBilgileri->kodu);
    	$kontrol += preg_match_all('/[^\w]/', $ilacBilgileri->turu);

    	if ($kontrol > 0) {
            return new JsonResponse('{"message":"Girilen bilgiler sadece harf ve sayıdan oluşmalıdır."}', 404, [], true);
    	}

    	if ( $ilacBilgileri->adi && $ilacBilgileri->kodu && $ilacBilgileri->turu && $ilacBilgileri->skt && $depoKodu ) {

    		if (count($etkenler) >= 1) {
   
    			$entityManager = $this->getDoctrine()->getManager();

		    	$ilac = new Ilac();
		    	$ilac->setAd($ilacBilgileri->adi);
		    	$ilac->setKod($ilacBilgileri->kodu);
		    	$ilac->setTur($ilacBilgileri->turu);
		    	$date = \DateTime::createFromFormat('j.m.Y', $ilacBilgileri->skt);
		    	if (!$date) {
                    return new JsonResponse('{"message":"Girilen tarih formatı uygun değil."}', 404, [], true);
		    	}
		    	$ilac->setSkt($date);
		    	$ilac->setDepoKod($depoKodu); 

		    	foreach ($etkenler as $etken)
		    	{
		    		$etkenObjesi = new Etken();
		    		$etkenObjesi->setAd($etken->etkenadi);
		    		$entityManager->persist($etkenObjesi);
		    		$ilac->addEtken($etkenObjesi);  	
		    	}    	
			    
		        $entityManager->persist($ilac);
		        $entityManager->flush();
                return new JsonResponse('{"message":"Oluşturuldu."}', 200, [], true);
    		} else {
                return new JsonResponse('{"message":"En az 1 etken madde eklemelisiniz."}', 404, [], true);
    		}

    	} else {
            return new JsonResponse('{"message":"İlaç özellikleri boş olamaz."}', 404, [], true);
    	}
    }

    /**
     * İlaç Güncelleme
     *
     * @Route("rest/v1/depo/{depoKodu}/ilac/{ilacKodu}", name="api_update", methods={"PUT"})
     *     
     */
    public function updateAction(String $ilacKodu, String $depoKodu, Request $request)
    {

    	$req = json_decode($request->getContent());
    	$ilacBilgileri = $req->ilac;
    	$etkenBilgileri = $req->ilac->etkenler;
        $entityManager = $this->getDoctrine()->getManager();

        
        $ilac = $this->getDoctrine()
                        ->getRepository(Ilac::class)
                        ->findOneBy(array('kod' => $ilacBilgileri->kodu, "depoKod" => $depoKodu ));

        if ($ilac)
        {
            return new JsonResponse('{"message":"Bu ilaç kodu daha önce kullanılmış."}', 404, [], true);
        }

		$ilac = $this->getDoctrine()
					->getRepository(Ilac::class)
					->findOneBy(array('kod' => $ilacKodu, "depoKod" => $depoKodu ));

		if (!$ilac) {
            return new JsonResponse('{"message":"Kayıt bulunamadı."}', 404, [], true);
		}
	
		if ($ilacBilgileri->adi) {
			$ilac->setAd($ilacBilgileri->adi);
		}

		if ($ilacBilgileri->kodu) {
			$ilac->setKod($ilacBilgileri->kodu);
		}

		if ($ilacBilgileri->turu) {
			$ilac->setTur($ilacBilgileri->turu);
		}
		
		if ($ilacBilgileri->skt) {
	    	$date = \DateTime::createFromFormat('j.m.Y', $ilacBilgileri->skt);
	    	if (!$date) {
                return new JsonResponse('{"message":"Girilen tarih formatı uygun değil."}', 404, [], true);
	    	}
	    	$ilac->setSkt($date);			
		}
        
        if ($etkenBilgileri) {
            foreach ($etkenler = $ilac->getEtken() as $etken)
            {
                $entityManager->remove($etken);
            }
            
            foreach ($etkenBilgileri as $etkenBilgisi)
            {
                $yeniEtken = new Etken();
                $yeniEtken->setAd($etkenBilgisi->etkenadi);
                $entityManager->persist($yeniEtken);
                $ilac->addEtken($yeniEtken);
            }            
        }


		$entityManager->persist($ilac);
		$entityManager->flush();

        return new JsonResponse('{"message":"Kayıt güncellendi"}', 200, [], true);
    }

    /**
     * İlaç Silme
     *
     * @Route("rest/v1/depo/{depoKodu}/ilac/{ilacKodu}", name="api_delete", methods={"DELETE"})
     *     
     */
    public function deleteAction(String $ilacKodu, String $depoKodu)
    {
		$ilac = $this->getDoctrine()
					->getRepository(Ilac::class)
					->findOneBy(array('kod' => $ilacKodu, "depoKod" => $depoKodu ));

		if (!$ilac) {
            return new JsonResponse('{"message":"Kayıt bulunamadı."}', 404, [], true);
		}

		$entityManager = $this->getDoctrine()->getManager();					
		$entityManager->remove($ilac);
		$entityManager->flush();

        return new JsonResponse('{"message":"Silme işlemi başarılı."}', 200, [], true);
    }

    /**
     * İlaca Resim Ekleme
     *
     * @Route("rest/v1/depo/{depoKodu}/ilac/{ilacKodu}/resim", methods={"POST"})
     *
     */
    public function imageUploadAction(String $ilacKodu, String $depoKodu, Request $request)
    {
        $file = $request->files->get('resim');

        if ($file)
        {
            $ilac = $this->getDoctrine()
                ->getRepository(Ilac::class)
                ->findOneBy(array('kod' => $ilacKodu, "depoKod" => $depoKodu ));

            if (!$ilac)
            {
                return new JsonResponse('{"message":"Resim yüklemek için seçilen ilaç sistemde kayıtlı değil."}', 404, [], true);
            }

            $fileName = md5(uniqid()).".".$file->guessExtension();
            $file->move($this->getParameter('uploads_directory'), $fileName);
            $ilac->setResimUrl($fileName);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($ilac);
            $entityManager->flush();

            return new JsonResponse('{"message":"Resim yükleme işlemi başarılı."}', 200, [], true);
        }

        return new JsonResponse('{"message":"Resim boş olamaz."}', 404, [], true);
    }

    /**
     * Depoları Gösterme
     *
     * @Route("rest/v1/depo/", methods={"GET"})
     *
     */
    public function getDepo()
    {
        $depolar = '{"depolar":[{"depo":"egeecza"},{"depo":"nisanecza"},{"depo":"eczaadana"}]}';
        return new JsonResponse($depolar, 200, [], true);
    }

}
