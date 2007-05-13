/* create table OMC3_EN_lexstat (
	form varchar(100), 
	lemma varchar(100), 
	pos varchar(10), 
 	type varchar(10), 
 	degr_dia varchar(10), 
 	tense_defin varchar(10), 
 	mood_case varchar(10), 
	person_type2 varchar(10), 
 	number varchar(10), 
 	gender varchar(10), 
 	freq int default 1, 
 	primary key (form, lemma, pos, type, degr_dia, tense_defin, mood_case, person_type2, number, gender),
 	index (form, freq),
 	index (pos, freq),
 	index (lemma, freq)
) engine=myisam; */


create table ILN_LEKS_lexstat (
	form varchar(100), 
	lemma varchar(100), 
	pos varchar(10), 
	type varchar(10), 
	grad_dia varchar(10), 
	tid_bestemthet varchar(10), 
	modus_kasus varchar(10), 
	person_type2 varchar(10), 
	tall varchar(10), 
	kjonn varchar(10), 
	freq int default 1, 
	primary key (form, lemma, pos, type, grad_dia, tid_bestemthet, modus_kasus, person_type2, tall, kjonn),
	index (form, freq),
	index (pos, freq),
	index (lemma, freq)
) engine=myisam;
