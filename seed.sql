-- Seed demo objects (strictly 1200–1850, placeholders)
DELETE FROM object_images;
DELETE FROM objects;

INSERT OR REPLACE INTO objects (
  id, slug, title_en, title_nl, maker, period, year, region, category, material, status,
  material_text, description_long_en, description_long_nl, provenance, condition,
  dimensions_json, pdf_factsheet_url, featured, _demo_placeholder, _demo_source
) VALUES
('obj-001','ink-drawing-17th-century-ship','Ink Drawing of a Dutch Fluyt','Inktekening van een Nederlandse Fluit','Anonymous (Dutch school)','17th c.',1650,'Netherlands','Drawings','["Ink","Paper"]','Available','Ink Paper','Study of a Dutch fluyt ship in calm waters. Placeholder for demo purposes.','Studie van een Nederlandse fluit in kalme wateren. Placeholder voor demo-doeleinden.','Demo item (placeholder). Source: Rijksmuseum open data.','Minor foxing, edges toned','{"h":21,"w":32,"unit":"cm"}',NULL,1,1,'Unsplash/Rijksmuseum open data (placeholder)'),
('obj-002','17th-century-wine-glass','17th-Century Wine Glass','17e-eeuws Wijnglas','Low Countries workshop','17th c.',1680,'Low Countries','Glasswork','["Glass"]','Available','Glass','Bell-shaped bowl on a hollow stem. Placeholder description.','Belvormige kelk op een holle stam. Placeholder beschrijving.','Demo item (placeholder). Source: public domain.','Surface wear consistent with age','{"h":14,"w":7,"unit":"cm"}',NULL,1,1,'Public domain placeholder'),
('obj-003','bodemvondst-plate-18th-century','Earthenware Plate (Bodemvondst)','Aardewerken Bord (Bodemvondst)','Unknown','18th c.',1750,'Netherlands','Bodemvondsten','["Earthenware","Glaze"]','Archive','Earthenware Glaze','Recovered plate fragment with tin glaze.','Gevonden bordfragment met tinglazuur.','Demo item (placeholder). Source: municipal archaeology records (placeholder).','Fragmented and restored','{"h":3,"w":24,"unit":"cm"}',NULL,0,1,'Placeholder archaeology image'),
('obj-004','drawing-portrait-18th-century','Portrait Study in Red Chalk','Portretstudie in Rood Krijt','Workshop of Cornelis Troost (attrib.)','18th c.',1735,'Amsterdam','Drawings','["Red chalk","Paper"]','Available','Red chalk Paper','Classical study of a sitter facing left.','Klassieke studie van een model naar links.','Demo item (placeholder). Source: public domain.','Laid paper, minor creases','{"h":28,"w":19,"unit":"cm"}',NULL,0,1,'Public domain placeholder'),
('obj-005','bodemvondst-cup-17th-century','Stoneware Cup (Bodemvondst)','Steengoed Beker (Bodemvondst)','Unknown','17th c.',1625,'Rhine region','Bodemvondsten','["Stoneware"]','Available','Stoneware','Grey stoneware cup, salt-glazed.','Grijze steengoed beker, zoutglazuur.','Demo item (placeholder). Source: archaeological placeholder.','Chips and soil encrustation','{"h":10,"w":8,"unit":"cm"}',NULL,0,1,'Placeholder archaeology image');

-- Images
INSERT INTO object_images (object_id,url,alt_en,alt_nl,width,height,position) VALUES
('obj-001','https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1600&q=80&auto=format&fit=crop','Ink drawing of ship','Inktekening van schip',1600,1200,0),
('obj-002','https://images.unsplash.com/photo-1520848315518-b991dd16a6cf?w=1600&q=80&auto=format&fit=crop','Historic wine glass','Historisch wijnglas',1600,1200,0),
('obj-003','https://images.unsplash.com/photo-1544989164-31dc3c645987?w=1600&q=80&auto=format&fit=crop','Archaeological earthenware plate','Archeologisch aardewerken bord',1600,1200,0),
('obj-004','https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80&auto=format&fit=crop','Red chalk portrait study','Portretstudie in rood krijt',1600,1200,0),
('obj-005','https://images.unsplash.com/photo-1582582429416-2b2a28d36f0e?w=1600&q=80&auto=format&fit=crop','Stoneware cup','Steengoed beker',1600,1200,0);
