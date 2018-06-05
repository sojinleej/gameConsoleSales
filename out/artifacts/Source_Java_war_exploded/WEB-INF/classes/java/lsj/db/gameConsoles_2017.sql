-- gameConsoles_2017.sql
-- =====================
-- Game console platform/software Sales in 2017-10-11
-- Source: www.vgchartz.com/platforms/
--
--  AUTHOR: Song Ho Ahn (song.ahn@gmail.com)
-- CREATED: 2017-10-11
-- UPDATED: 2017-10-11

USE ejd;

DROP TABLE IF EXISTS ConsoleSales;

-- hardwareSales is in millions of units
-- softwareSales is in millions of units
-- gameTitles is # of game titles
CREATE TABLE ConsoleSales
(
    id              INT AUTO_INCREMENT PRIMARY KEY,
    consoleName     VARCHAR(100) NOT NULL,
    hardwareSales   DOUBLE,
    softwareSales   DOUBLE,
    gameTitles      INT
);

-- populate data
INSERT INTO ConsoleSales (consoleName, hardwareSales, softwareSales, gameTitles) VALUES
('Atari 2600 (2600)', 27.64, 128.8, 497),
('Atari 7800 (7800)', 4.3, 0, 59),
('Dreamcast (DC)', 8.2, 64.89, 652),
('Game Boy (GB)', 118.69, 501.11, 1608),
('Game Boy Advance (GBA)', 81.51, 377.41, 1640),
('GameCube (GC)', 21.74, 208.61,	673),
('GameGear (GG)', 10.62, 38.26, 334),
('iOS (iOS)', 0, 0, 145795),
('Microsoft Windows (PC)', 0, 310.44, 9460),
('Nintendo 3DS (3DS)', 66.0, 296.92, 1170),
('Nintendo 64 (N64)', 32.93, 225.16, 395),
('Nintendo DS (DS)', 154.88, 844.74, 4009),
('Nintendo Entertainment System (NES)', 61.91, 501.48, 1093),
('Nintendo Switch (NS)', 5.74, 11.92, 89),
('Super Nintendo Entertainment System (SNES)', 49.1, 379.06, 1207),
('Wii (Wii)', 101.18, 965.78, 2809),
('Wii U (WiiU)', 13.96, 90.37, 376),
('PlayStation (PS)', 104.25, 962.01, 2680),
('PlayStation 2 (PS2)', 157.68,	1661.95, 3549),
('PlayStation 3 (PS3)', 86.89, 974.34, 3316),
('PlayStation 4 (PS4)', 62.57, 408.48, 1004),
('PlayStation Portable (PSP)', 80.82, 304.53, 1806),
('PlayStation Vita (PSV)', 15.66, 67.8, 948),
('Sega Genesis (GEN)', 29.54, 175.8, 802),
('Sega Saturn (SAT)', 8.82, 47.34, 737),
('Xbox (XB)', 24.65, 271.46, 978),
('Xbox 360 (X360)', 85.8, 1007.16, 3678),
('Xbox One (XOne)', 30.76, 197.93, 602),
('WonderSwan (WS)', 1.12, 1.5, 201),
('Mac OS X (OSX)', 0, 0, 625),
('Android (And)', 0, 0, 980);


SELECT * FROM ConsoleSales;




