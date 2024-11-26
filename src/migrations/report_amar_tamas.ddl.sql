CREATE PROCEDURE [dbo].[report_amar_tamas]
@startDate char(10), @endDate char(10), @userId smallInt  
AS
select sum(d.Quantity * o.Vazn)/1000 as 'weight' from s_sefaresh_hed as h 
	inner join s_sefaresh_dtl as d on h.id = d.id
	left outer join s_ods as o on d.OD_CD = o.OD_CD
	where h.Sefaresh_Date between @startDate and @endDate
	and h.S_CD = @userId
	and h.status in (3,6,7)
GO