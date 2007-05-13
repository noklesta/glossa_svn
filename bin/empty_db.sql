-- MySQL dump 10.8
--
-- Host: localhost    Database: CE_omc
-- ------------------------------------------------------
-- Server version	4.1.7-standard

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE="NO_AUTO_VALUE_ON_ZERO" */;

--
-- Table structure for table `OMC3_DE_lexstat`
--

DROP TABLE IF EXISTS `OMC3_DE_lexstat`;
CREATE TABLE `OMC3_DE_lexstat` (
  `form` varchar(100) NOT NULL default '',
  `lemma` varchar(100) NOT NULL default '',
  `pos` varchar(10) NOT NULL default '',
  `type` varchar(10) NOT NULL default '',
  `degr_dia` varchar(10) NOT NULL default '',
  `tense_defin` varchar(10) NOT NULL default '',
  `mood_case` varchar(10) NOT NULL default '',
  `person_type2` varchar(10) NOT NULL default '',
  `number` varchar(10) NOT NULL default '',
  `gender` varchar(10) NOT NULL default '',
  `freq` int(11) default '1',
  PRIMARY KEY  (`form`,`lemma`,`pos`,`type`,`degr_dia`,`tense_defin`,`mood_case`,`person_type2`,`number`,`gender`),
  KEY `lemma` (`lemma`,`freq`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `OMC3_DE_lexstat`
--


/*!40000 ALTER TABLE `OMC3_DE_lexstat` DISABLE KEYS */;
LOCK TABLES `OMC3_DE_lexstat` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `OMC3_DE_lexstat` ENABLE KEYS */;

--
-- Table structure for table `OMC3_EN_lexstat`
--

DROP TABLE IF EXISTS `OMC3_EN_lexstat`;
CREATE TABLE `OMC3_EN_lexstat` (
  `form` varchar(100) NOT NULL default '',
  `lemma` varchar(100) NOT NULL default '',
  `pos` varchar(10) NOT NULL default '',
  `type` varchar(10) NOT NULL default '',
  `degr_dia` varchar(10) NOT NULL default '',
  `tense_defin` varchar(10) NOT NULL default '',
  `mood_case` varchar(10) NOT NULL default '',
  `person_type2` varchar(10) NOT NULL default '',
  `number` varchar(10) NOT NULL default '',
  `gender` varchar(10) NOT NULL default '',
  `freq` int(11) default '1',
  PRIMARY KEY  (`form`,`lemma`,`pos`,`type`,`degr_dia`,`tense_defin`,`mood_case`,`person_type2`,`number`,`gender`),
  KEY `lemma` (`lemma`,`freq`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `OMC3_EN_lexstat`
--


/*!40000 ALTER TABLE `OMC3_EN_lexstat` DISABLE KEYS */;
LOCK TABLES `OMC3_EN_lexstat` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `OMC3_EN_lexstat` ENABLE KEYS */;

--
-- Table structure for table `OMC3_FR_lexstat`
--

DROP TABLE IF EXISTS `OMC3_FR_lexstat`;
CREATE TABLE `OMC3_FR_lexstat` (
  `form` varchar(100) NOT NULL default '',
  `lemma` varchar(100) NOT NULL default '',
  `pos` varchar(10) NOT NULL default '',
  `type` varchar(10) NOT NULL default '',
  `degr_dia` varchar(10) NOT NULL default '',
  `tense_defin` varchar(10) NOT NULL default '',
  `mood_case` varchar(10) NOT NULL default '',
  `person_type2` varchar(10) NOT NULL default '',
  `number` varchar(10) NOT NULL default '',
  `gender` varchar(10) NOT NULL default '',
  `freq` int(11) default '1',
  PRIMARY KEY  (`form`,`lemma`,`pos`,`type`,`degr_dia`,`tense_defin`,`mood_case`,`person_type2`,`number`,`gender`),
  KEY `lemma` (`lemma`,`freq`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `OMC3_FR_lexstat`
--


/*!40000 ALTER TABLE `OMC3_FR_lexstat` DISABLE KEYS */;
LOCK TABLES `OMC3_FR_lexstat` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `OMC3_FR_lexstat` ENABLE KEYS */;

--
-- Table structure for table `OMC3_NL_lexstat`
--

DROP TABLE IF EXISTS `OMC3_NL_lexstat`;
CREATE TABLE `OMC3_NL_lexstat` (
  `form` varchar(100) NOT NULL default '',
  `lemma` varchar(100) NOT NULL default '',
  `pos` varchar(10) NOT NULL default '',
  `type` varchar(10) NOT NULL default '',
  `degr_dia` varchar(10) NOT NULL default '',
  `tense_defin` varchar(10) NOT NULL default '',
  `mood_case` varchar(10) NOT NULL default '',
  `person_type2` varchar(10) NOT NULL default '',
  `number` varchar(10) NOT NULL default '',
  `gender` varchar(10) NOT NULL default '',
  `freq` int(11) default '1',
  PRIMARY KEY  (`form`,`lemma`,`pos`,`type`,`degr_dia`,`tense_defin`,`mood_case`,`person_type2`,`number`,`gender`),
  KEY `lemma` (`lemma`,`freq`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `OMC3_NL_lexstat`
--


/*!40000 ALTER TABLE `OMC3_NL_lexstat` DISABLE KEYS */;
LOCK TABLES `OMC3_NL_lexstat` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `OMC3_NL_lexstat` ENABLE KEYS */;

--
-- Table structure for table `OMC3_NO_lexstat`
--

DROP TABLE IF EXISTS `OMC3_NO_lexstat`;
CREATE TABLE `OMC3_NO_lexstat` (
  `form` varchar(100) NOT NULL default '',
  `lemma` varchar(100) NOT NULL default '',
  `pos` varchar(10) NOT NULL default '',
  `type` varchar(10) NOT NULL default '',
  `degr_dia` varchar(10) NOT NULL default '',
  `tense_defin` varchar(10) NOT NULL default '',
  `mood_case` varchar(10) NOT NULL default '',
  `person_type2` varchar(10) NOT NULL default '',
  `number` varchar(10) NOT NULL default '',
  `gender` varchar(10) NOT NULL default '',
  `freq` int(11) default '1',
  PRIMARY KEY  (`form`,`lemma`,`pos`,`type`,`degr_dia`,`tense_defin`,`mood_case`,`person_type2`,`number`,`gender`),
  KEY `lemma` (`lemma`,`freq`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `OMC3_NO_lexstat`
--


/*!40000 ALTER TABLE `OMC3_NO_lexstat` DISABLE KEYS */;
LOCK TABLES `OMC3_NO_lexstat` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `OMC3_NO_lexstat` ENABLE KEYS */;

--
-- Table structure for table `OMC3_PO_lexstat`
--

DROP TABLE IF EXISTS `OMC3_PO_lexstat`;
CREATE TABLE `OMC3_PO_lexstat` (
  `form` varchar(100) NOT NULL default '',
  `lemma` varchar(100) NOT NULL default '',
  `pos` varchar(10) NOT NULL default '',
  `type` varchar(10) NOT NULL default '',
  `degr_dia` varchar(10) NOT NULL default '',
  `tense_defin` varchar(10) NOT NULL default '',
  `mood_case` varchar(10) NOT NULL default '',
  `person_type2` varchar(10) NOT NULL default '',
  `number` varchar(10) NOT NULL default '',
  `gender` varchar(10) NOT NULL default '',
  `freq` int(11) default '1',
  PRIMARY KEY  (`form`,`lemma`,`pos`,`type`,`degr_dia`,`tense_defin`,`mood_case`,`person_type2`,`number`,`gender`),
  KEY `lemma` (`lemma`,`freq`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `OMC3_PO_lexstat`
--


/*!40000 ALTER TABLE `OMC3_PO_lexstat` DISABLE KEYS */;
LOCK TABLES `OMC3_PO_lexstat` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `OMC3_PO_lexstat` ENABLE KEYS */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
CREATE TABLE `author` (
  `a_id` int(11) NOT NULL auto_increment,
  `firstname` varchar(100) default '',
  `lastname` varchar(100) default '',
  `type` varchar(10) default '',
  `sex` char(1) default '',
  `geogr` varchar(10) default '',
  `born` year(4) default NULL,
  `tid` varchar(255) default NULL,
  `name` varchar(100) default NULL,
  `in_collection` tinyint(4) default NULL,
  PRIMARY KEY  (`a_id`),
  KEY `firstname` (`firstname`),
  KEY `lastname` (`lastname`),
  KEY `type` (`type`),
  KEY `sex` (`sex`),
  KEY `geogr` (`geogr`),
  KEY `born` (`born`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `author`
--


/*!40000 ALTER TABLE `author` DISABLE KEYS */;
LOCK TABLES `author` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `author` ENABLE KEYS */;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `tid` varchar(255) NOT NULL default '',
  `class` varchar(255) NOT NULL default '',
  `classtype` varchar(255) NOT NULL default '',
  `freq` int(11) default NULL,
  PRIMARY KEY  (`tid`,`class`),
  KEY `classtype` (`classtype`),
  KEY `class` (`class`,`tid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `class`
--


/*!40000 ALTER TABLE `class` DISABLE KEYS */;
LOCK TABLES `class` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `class` ENABLE KEYS */;

--
-- Table structure for table `s_align`
--

DROP TABLE IF EXISTS `s_align`;
CREATE TABLE `s_align` (
  `source` varchar(20) NOT NULL default '',
  `target` varchar(20) NOT NULL default '',
  `lang` char(2) NOT NULL default '',
  PRIMARY KEY  (`source`,`target`,`lang`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `s_align`
--


/*!40000 ALTER TABLE `s_align` DISABLE KEYS */;
LOCK TABLES `s_align` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `s_align` ENABLE KEYS */;

--
-- Table structure for table `text`
--

DROP TABLE IF EXISTS `text`;
CREATE TABLE `text` (
  `tid` varchar(255) NOT NULL default '',
  `title` varchar(255) default '',
  `wordcount` int(11) default '0',
  `publisher` varchar(255) default '',
  `pubdate` year(4) default NULL,
  `pubplace` varchar(255) default '',
  `translation` varchar(255) default NULL,
  `lang` varchar(255) default NULL,
  `origlang` varchar(255) default NULL,
  `tagger` varchar(255) default NULL,
  `langvariety` varchar(255) default NULL,
  `author` varchar(255) default NULL,
  `translator` varchar(255) default NULL,
  `classcode` varchar(255) default NULL,
  `istrans` varchar(255) default NULL,
  `startpos` int(11) default NULL,
  `endpos` int(11) default NULL,
  PRIMARY KEY  (`tid`),
  KEY `title` (`title`),
  KEY `publisher` (`publisher`),
  KEY `pubdate` (`pubdate`),
  KEY `pubplace` (`pubplace`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `text`
--


/*!40000 ALTER TABLE `text` DISABLE KEYS */;
LOCK TABLES `text` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `text` ENABLE KEYS */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

