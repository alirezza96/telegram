create table bot_users (
	id bigint primary key,
	first_name varchar(30),
	last_name varchar(30),
	username varchar(50),
	userId smallint,
	status varchar(10) not null default 'member',
	branch_no smallint,
	is_logged_in  bit default 0,
	auth_expired_date date 
	constraint FK_u_users foreign key (userId) references u_users(code) on delete cascade on update cascade,
	constraint Unique_userId_branch unique(userId,branch_no)
)



