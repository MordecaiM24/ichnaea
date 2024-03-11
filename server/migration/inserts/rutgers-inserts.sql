INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Rutgers University', 'Rutgers', 'rutgers', 'Piscataway, NJ', 'City', 2656, 55, 68.2, 36344, 36001, 15365, 'Public', 1270, 1370, 1480, 28, 31, 33);
-- Deadline 1 for Rutgers University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rutgers University'), 'regularDecision', '2023-12-02T00:00:00.000Z', 'Regular Decision', '2023-12-02T00:00:00.000Z');
-- Deadline 2 for Rutgers University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rutgers University'), 'earlyAction', '2023-11-02T00:00:00.000Z', 'Early Action', '2023-12-02T00:00:00.000Z');
-- Supplemental Essay 1 for Rutgers University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Rutgers University'), 'Rutgers does not have any supplemental essays. ', 0);
