INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('University of Virginia', 'UVA', 'uva', 'Charlottesville, VA', 'Suburban', 1682, 25, 20.7, 17299, 56837, 22006, 'Public', 1400, 1460, 1510, 30, 32, 35);
-- Deadline 1 for University of Virginia
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Virginia'), 'regularDecision', '2024-01-06T00:00:00.000Z', 'Regular Decision', '2024-03-02T00:00:00.000Z');
-- Deadline 2 for University of Virginia
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Virginia'), 'earlyAction', '2023-11-02T00:00:00.000Z', 'Early Action', '2023-12-02T00:00:00.000Z');
-- Deadline 3 for University of Virginia
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Virginia'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision', '2023-11-16T00:00:00.000Z');
-- Supplemental Essay 1 for University of Virginia
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Virginia'), 'UVA does not have any supplemental essays!', 0);
